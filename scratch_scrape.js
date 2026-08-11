const fs = require('fs');

async function searchNedrug(productName) {
  const url = `https://nedrug.mfds.go.kr/searchDrug`;
  const params = new URLSearchParams({
    searchYn: 'true',
    itemName: productName,
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.log(`Failed for ${productName}: HTTP ${response.status}`);
      return;
    }
    
    const text = await response.text();
    console.log(`Response length for ${productName}: ${text.length}`);
    
    // Check if we can find English name logic.
    // nedrug usually returns a list of results in a table. We would have to parse the table to get the detail page, then get the English name.
    // Or maybe the search result has it directly?
    
    fs.writeFileSync('scratch_nedrug_res.html', text);
    console.log('Saved to scratch_nedrug_res.html');
  } catch (err) {
    console.error(err);
  }
}

searchNedrug('다파글리정 10mg');
