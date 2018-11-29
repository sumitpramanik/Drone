var fs = require('fs');

fs.readFile('./droneInput.txt', 'utf-8', function(err, data) {
    if(err){
        throw err;
    }
        data = data.split("");
        //Initial co-ordinates
        var cordinates = {
            x: 0, y: 0
        };
        var result = [];
        var location = [];
        data.map(function (element) {
            //Works with any version of node
            var tempObj = Object.assign({}, cordinates);
            if (element == '<') {
                cordinates.x--;
                tempObj.x--;
            }
            else if (element == '>') {
                cordinates.x++;
                tempObj.x++;
            }
            else if (element == '^') {
                cordinates.y++;
                tempObj.y++;
            }
            else if (element == 'v') {
                cordinates.y--;
                tempObj.y--;
            }
            else if (element == 'x') {
                location.push(tempObj);
            }
            else {
                throw 'Invalid input';
            }

            /* Below code will work with node version greater than 8
             * it uses spread operator which creates a new object
             */

            /*if(element == '<') {
             cordinates = {
             ...cordinates,x:cordinates.x-1,y:cordinates.y
             }
             } else if(element == '>') {
             cordinates = {
             ...cordinates,x:cordinates.x+1,y:cordinates.y
             }
             } else if(element=='^') {
             cordinates = {
             ...cordinates,x:cordinates.x, y: cordinates.y+1
             }
             }
             else if(element=='v') {
             cordinates = {
             ...cordinates,x:cordinates.x, y:cordinates.y-1
             }
             } else if(element=='x'){
             // console.log(cordinates);
             return location.push(cordinates);
             }*/
        });
        console.log('-- total pictures taken ---', location.length)
        //to find duplicates
        for (var i = 0; i < location.length; i++) {
            var count = 1;
            for (var j = i + 1; j < location.length; j++) {
                if (location[i].x === location[j].x && location[i].y === location[j].y) {
                    count++
                }
            }
            //no. of billboards photographed once
            if (count == 1) {
                location[i]['count'] = count;
                result.push(location[i])
            }
            //Uncomment to find no. of duplicate photographs of billboard and comment out the above if block
            /*if (count > 1) {
                location[i]['count'] = count;
                result.push(location[i])
            }*/
        }
        console.log('-- No. of billboards photographed atleast once --', result.length);
        console.log('-- [{ x-coordinates, y-coordinate, count of duplicate pics }] --\n', result);
})