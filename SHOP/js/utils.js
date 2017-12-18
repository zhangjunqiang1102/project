var utils = (function () {
    var toArray = function (classArray) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(classArray)
        } catch (e) {
            for (var i = 0; i < classArray.length; i++) {
                ary[ary.length] = classArray[i];
            }
        }
        return ary;
    };
   var toJSON=function ( str) {
     return  "JSON" in window ? JSON.parse(str):eval("('+str+')")
   };
    return {
        toArray:toArray,
        toJSON:toJSON
    }
})();