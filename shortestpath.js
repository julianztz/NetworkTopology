var Dijkstra = function(start_point, end_point, r ){

    var infiniteNum = Number.MAX_VALUE;
    //for directed graph
    var nodes = (function( r ) {

        var vector = [];
            for(var i=0;i<r.length;i++) {
                for(var j=0;j<2;j++) 
                vector.push( r[ i ][ j ] );    
        }

        function max(a,b){
                 if(a>b) return a
                    else return b
        }

        function maxNum( li, ls ) {
            if(li == ls) 
                     return vector[ li ]
            else 
                m = parseInt((li+ls)/2)
                return max(maxNum(li,m), maxNum(m+1,ls));    
       }
          
       return maxNum(0, vector.length - 1)
    })( r )

    var start = start_point, 
          end = end_point; 
    var output = []; 
    //matrix to store graph
    var createMatrix = function(rows, columns) {
              var mat = new Array( rows );
              for (var i = 0; i < rows; i++) 
                      mat[i] = new Array( columns );
         return mat;
    };

    var createArray = function( n ) {
        var arr = new Array( n )
        for(var i = 0; i< arr.length; i++) 
            arr[i] = 0;
        return arr; 
    }  

    var matrix = r,
        Road = createMatrix(nodes + 1, nodes + 1),

        R = createArray( nodes + 1 ),
        F = createArray( nodes + 1 ),
        S = createArray( nodes + 1 ),

        get = function( node ) {
              if( F[ node ] ) get( F[ node ] )
              output.push( node )
        },

        getCost = function() {
                return ( R[end] ) 
        },

        getShortestPath = function() {                   
             get( end );
             return output;
        }, 

        read = (function() {
               var n = r.length, x, y, cost;
               for(var i = 1; i <= nodes; i++) {
                       for(var j = 1; j <= nodes; j++) {
                           if(i == j) Road[i][j] = 0; 
                               else   Road[i][j] = infiniteNum; 
                       }
               }

               for(var i = 0; i < n; i++) {
                   x = matrix[i][0]; 
                   y = matrix[i][1];
                   cost = matrix[i][2];
                   Road[x][y] = cost
               } 
        })(),

        solve = (function() {
                var min, posMin;
                S[start] = 1;
                 
                for(var i = 1; i <= nodes; i++) {
                    R[ i ] = Road[ start ][ i ];

                    if( start != i ) 
                        if( R[ i ] < infiniteNum) 
                            F[ i ] = start
                }

                for(var i=1; i <= nodes-1;i++) {
                    min = infiniteNum

                    for(var k = 1; k <= nodes; k++) {
                        if(S[ k ] == 0) 
                           if(R[ k ] < min) {
                              min = R[ k ]
                              posMin = k
                           }  
                    }

                    S[posMin] = 1
                    for(var j = 1; j <= nodes; j++) {
                        if(S[j] == 0) 
                           if(R[ j ] > R[ posMin ] + Road[ posMin ][ j ]) {
                                     R[ j ] = R[ posMin ] + Road[ posMin ][ j ]
                                     F[ j ] = posMin
                           }  
                    }
                }
        })();  
     
        return {
               getCost: getCost,
               getShortestPath: getShortestPath
        }
}