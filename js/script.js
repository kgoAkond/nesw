
        var imgSrc;
        var width = 0;
        var height = 0;
        var data;
        var step = 3;
        var n;
        var m;
        var grid;

        function loadImg() {  
            var canvas = document.getElementById('orgImg');
            var ctx = canvas.getContext('2d');
            canvas.width = 1600;
            canvas.height = 1200;
            imgSrc = new Image();
            imgSrc.src = "img/n2.png"; // can also be a remote URL e.g. http://
            imgSrc.crossOrigin = "Anonymous";
            imgSrc.onload = function() {
                ctx.drawImage(imgSrc,0,0);
                width = imgSrc.width;
                height = imgSrc.height;
                n = Math.round(width/step) + 1;
                m = Math.round(height/step) + 1;
                data = ctx.getImageData(0, 0, width, height).data;
            }
        }
        function drawImage(size, color, clear, debug){
            var canvas = document.getElementById('outCanvas');
            var ctxOut = canvas.getContext('2d');
            if(clear) {
                    canvas.width = 1600;
                    canvas.height = 1200;
                    ctxOut.fillStyle = 'rgba(30,30,30,1)';
                    ctxOut.clearRect(0, 0, canvas.width, canvas.height);
                    ctxOut.fillRect(0, 0, canvas.width, canvas.height);
            }
            var imgdOut = ctxOut.getImageData(0, 0, canvas.width, canvas.height);
            for( var i = 0; i < n; i++ ) {
                for( var j = 0; j < m; j++ ) {
                    var g = getGrid( i, j);
                    var c = getGridType(i , j);

                    if(c  === 1) {
                       drawRectangle(i,j, color, size, imgdOut.data, canvas.width);          
                    } else if( c === 2){
                       triangleNE(i, j, color,size, imgdOut.data, canvas.width);
                    } else if( c === 3){
                       triangleSE(i, j, color,size, imgdOut.data, canvas.width);
                    } else if( c === 4){
                       triangleNW(i, j, color,size, imgdOut.data, canvas.width);
                    } else if( c === 5){
                       triangleSW(i, j, color,size, imgdOut.data, canvas.width);
                    }
                    if(g  > 0) {
                        if(g == 1){
                           var cd = {r: 255, g: 0, b: 0};                                
                        } else {
                            var cd = {r: 0, g: 255, b: 0};                                    
                        }   
                        setPixel( i * size , j * size, cd, imgdOut.data, canvas.width);
                    }
                 }
            } 
            ctxOut.putImageData(imgdOut, 0, 0); 
                
        }
        function process(){        
             fillTheGrid(60, 240, 5, 2);
             drawImage(18, {r: 70, g: 70, b: 70}, true, "green");              
             fillTheGrid(0, 55, 5, 1);
             drawImage(18, {r: 55, g: 55, b: 55}, false, "red");              
        }
        function clearGrid(grid){
            var size = grid.length;
            var i=0;
            while ( i < size) { grid[i] =0; i++; }
        }

        function fillTheGrid(from, to, step, v){
            var size =   (n + 1) * (m + 1);
            grid = new Uint8ClampedArray(size);
            clearGrid(grid)    
            var i = 0;
            var j = 0;
            for( var x = 0; x < width; x+=step ) {
                j = 0;    
                for( var y = 0; y < height; y+=step ) {
                    var c = getPixel( x, y, data, width);
                    if(c.r  <= to && c.r >= from) {
                        if(j > 0 && i > 0) {
                                setGrid( i,  j  , v);
                                setGrid( i,  j - 1  , v);
                                setGrid( i + 1,  j  , v);
                                setGrid( i + 1,  j - 1  , v);
                        }
                    }
                    j++;
                 }
                 i++;
            }  
            
        }
        setGrid = function (x, y, v) {
            grid[n * y + x] = v;                    
        };
        getGridType = function(i, j) {
            if(getGrid(i,j) === 1 && getGrid(i + 1,j) === 1 && getGrid(i + 1,j + 1) === 1 && getGrid(i ,j + 1) === 1){
                  return 1;  
            }    
            if(getGrid(i,j) === 0 && getGrid(i + 1,j) === 1 && getGrid(i + 1,j + 1) === 1 && getGrid(i ,j + 1) === 1){
                  return 2;  
            }    
            if(getGrid(i,j) === 1 && getGrid(i + 1,j) === 0 && getGrid(i + 1,j + 1) === 1 && getGrid(i ,j + 1) === 1){
                  return 3;  
            }  
            if(getGrid(i,j) === 1 && getGrid(i + 1,j) === 1 && getGrid(i + 1,j + 1) === 1 && getGrid(i ,j + 1) === 0){
                  return 4;  
            }    
            if(getGrid(i,j) === 1 && getGrid(i + 1,j) === 1 && getGrid(i + 1,j + 1) === 0 && getGrid(i ,j + 1) === 1){
                  return 5;  
            }    
            return 0;
        }
        getGrid = function (x, y) {
            return grid[n * y + x];
          
        };
        drawRectangle = function( i, j, c, step, pix, width ) {
            for(var k = 0; k <= step; k++){
                for(var t = 0; t <= step; t++){
                    setPixel( i * step + k, j * step + t, c, pix, width)    
                }
            }
        }
        triangleNE = function (x, y, c, step, pix, width ) {
                x = x * step;
                y = y * step;
                for (var i = 0; i <= step; i++) {
                    for (var j = 0; j <= i; j++) {
                        setPixel(x + step - j, y + i, c, pix, width);
                    }
                }       
        };
        triangleSE = function (x, y, c, step, pix, width ) {
                x = x * step;
                y = y * step;
                for (var i = 0; i <= step; i++) {
                    for (var j = 0; j <= i; j++) {
                        setPixel(x + j, y + i, c, pix, width);
                    }
                }
        
        };
        triangleSW = function  (x, y, c, step, pix, width ) {
                x = x * step;
                y = y * step;
                for (var i = 0; i <= step; i++) {
                    for (var j = 0; j <= step - i; j++) {
                        setPixel(x + i, y + j, c, pix, width);
                    }
                }
        
        };
        triangleNW = function (x, y, c, step, pix, width ) {
                x = x * step;
                y = y * step;
                for (var i = 0; i <= step; i++) {
                    for (var j = 0; j <= i; j++) {
                        setPixel(x + i, y + j, c, pix, width);
                    }
                }        
        };

        setPixel = function (x, y, c, pix, width) {
            pix[ 4 * width * y + x * 4] = c.r;
            pix[ 4 * width * y + x * 4 + 1] = c.g;
            pix[ 4 * width * y + x * 4 + 2] = c.b;
        };
        getPixel = function (x, y, pix, width) {
        return {
            r: pix[ 4 * width * y + x * 4],
            g: pix[ 4 * width * y + x * 4 + 1],
            b: pix[ 4 * width * y + x * 4 + 2]
        }
    };
