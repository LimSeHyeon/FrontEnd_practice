import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs'

/**
 4월 1일부터, 4월 19일까지 주별로 뉴스기사 수집하기 (주별로: (영업일 5일 / 1주) 1페이지: 총 3페이지) 
    - (20240401 00시 00분 00초~20240405 23시59분59초)
    - (20240408 00시 00분 00초~20240412 23시59분59초)
    - (20240415 00시 00분 00초~20240419 23시59분59초)
    - 저장 형태는 Object형태로 하시되 key는 끝나는 날짜, value는 array<object({title:기사제목, url: 기사링크})>로 저장하기
*/

let news = {};

const timelineSd = [20240401000000, 20240408000000, 20240408000000];
const timelineEd = [20240405235959, 20240412235959, 20240415235959];

const baseUrl = "https://search.daum.net/search";

async function main(){
    for(let i=0;i<timelineEd.length;i++){
        const resp = await axios.get(baseUrl, {
            params: {
                w:'news',
                cluster:'y',
                q:'삼성전자',
                sd: timelineSd[i],
                ed: timelineEd[i],
                period:'u',
                DA:'STC'
            }
        });
        let data = await resp.data;
        const $ = cheerio.load(data);
        const newsList = $('ul.c-list-basic > li');
        const newsParsed = newsList.map((i, elem) => {
            const anchor = $(elem).find('.c-item-content .item-title a');
            const title = anchor.text();
            const url = anchor.prop('href');
            return { "title": title, "url": url };
        }).get();
        const date = timelineEd[i].toString();
        const year = date.substring(0,4);
        const month = date.substring(4,6);
        const day = date.substring(6,8);
        news[`${year}-${month}-${day}`] = newsParsed;
    }
    console.log(news);
    fs.writeFile('../news.json', JSON.stringify(news, null, 2), ()=>{});
}

main();