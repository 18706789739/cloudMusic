function binary_search(arr, key) {
    var low = 0,
        high = arr.length - 1;
    while(low <= high){
        var mid = parseInt((high + low) / 2);
        //console.log(key,arr[mid],key == arr[mid])
        if(key == arr[mid]){
            return  mid;
        }else if(key > arr[mid]){
            low = mid + 1;
        }else if(key < arr[mid]){
            high = mid -1;
        }else{
            return -1;
        }
    }
    if(key != arr[mid])return false;
};
export {
    binary_search
}