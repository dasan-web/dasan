const fs = require('fs');
const { PNG } = require('pngjs');

fs.createReadStream('frame.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    let minX = this.width, maxX = 0;
    let minY = this.height, maxY = 0;

    // We only care about the center portion of the image where the lake is.
    const cx = this.width / 2;
    const cy = this.height / 2;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx+1];
        let b = this.data[idx+2];
        
        // The lake is white/blueish (clouds and sky), forest is green/dark.
        // Let's find pixels that are bright (clouds) or blue (sky).
        if (r > 150 && g > 150 && b > 150) {
          // Check if it's near the center
          if (Math.abs(x - cx) < 600 && Math.abs(y - cy) < 400) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
    }
    
    console.log(`Lake bounding box: x=${minX}-${maxX}, y=${minY}-${maxY}`);
    console.log(`Width: ${maxX - minX}, Height: ${maxY - minY}`);
    console.log(`Center: x=${(minX+maxX)/2}, y=${(minY+maxY)/2}`);
    
    // In percentages (0-100)
    console.log(`Lake bounding box (%%): x=${(minX/this.width*100).toFixed(2)}-${(maxX/this.width*100).toFixed(2)}, y=${(minY/this.height*100).toFixed(2)}-${(maxY/this.height*100).toFixed(2)}`);
  });
