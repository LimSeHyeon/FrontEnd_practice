import axios from "axios";
import fs from "fs";
/**
4월 1일부터, 4월 19일까지 삼성전자  주봉(3개)가져와서 json으로 저장하기.
json에 들어갈 필수 key
[date, tradePrice(종가), openingPrice, highPrice, lowPrice, candleAccTradePrice(거래대금)]
*/
async function main() {
  const url =
    "https://finance.daum.net/api/charts/A005930/weeks?limit=200&adjusted=true";
  const resp = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Sec-Ch-Ua":
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      Referer: "https://finance.daum.net/quotes/A005930",
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      Cookie:
        "webid=aae56a581d8e4eecb5d15021d03d232e; webid_ts=1646837053679; __gads=ID=e6c0e09df7403959:T=1715065168:RT=1716299227:S=ALNI_MaXay-OA9pesfb9BDpjs_Fwl5dKww; __gpi=UID=00000e114891cc45:T=1715065168:RT=1716299227:S=ALNI_MbyRoO4c5DU8NuAdwn8wVk4MeeezQ; __eoi=ID=82add19c82b442a4:T=1715065168:RT=1716299227:S=AA-AfjY_Rd6Z_vNgcdwVIOcdXVwn; recentMenus=[{%22destination%22:%22chart%22%2C%22title%22:%22%EC%B0%A8%ED%8A%B8%22}]; KAKAO_STOCK_CHART_ENABLED_INDICATORS=[%22sma%22%2C%22column%22]; KAKAO_STOCK_RECENT=[%22A005930%22]; webid_sync=1716370809667; _ga_95KBWX9T2N=GS1.1.1716370810.1.0.1716370810.0.0.0; _ga=GA1.2.801694737.1716370811; _gid=GA1.2.1996717547.1716370811; _gat_gtag_UA_74989022_11=1; _T_ANO=OGe5q5ZxZ6J4RCMqFlYNItwDGbr6og30s4N5Tl8DZT2m4d+0nQD5JyvkT2skIn4pGieDNJUQorV3CMU1tpDAsTSuoRZvbPYkFkIU4yJniBDV8RGIvKc5xXiXnpFgG7ycdToElKnPOr03Tec6SXsx8UoEbz6MxMJRoQRFpcjR8YS2CXjmyPeZ9InMhfl3x0hfUOMzkTLwCYIW3P51FcPZ4a9nUvlkfWqQvHb0Ls0GSusuRK+RGcuACCaHg+lO4J15L7GUtXXFvGyRbe0LJ/itRhHpsPxrR/TV+Kiw1BnG/eUMi0b7YFs2I5Hfl04ptV1MAapmFBXh6hNcdgwcLKoPdw==",
    },
  });

  const data = await resp.data.data;

  const dates = ["2024-04-05", "2024-04-12", "2024-04-19"];

  const stockArray = data.filter((item, idx) => {
    return dates.includes(item.date);
  }).map((elem, idx) => {
      return {
        date: elem.date,
        tradePrice: elem.tradePrice,
        openingPrice: elem.openingPrice,
        highPrice: elem.highPrice,
        lowPrice: elem.lowPrice,
        candleAccTradePrice: elem.candleAccTradePrice,
      };
    })

  console.log(stockArray);
  fs.writeFile('../stock.json', JSON.stringify(stockArray, null, 2), ()=>{});
}

main();
