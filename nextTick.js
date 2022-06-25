let i = 0;
let j = 0;

var loop2 = function (){
    if(j== 10){
        return;
    } else{
        console.log({j});
        j++;
        loop2();
    }
}

setTimeout(function(){
    console.log("setTimeout j");
    loop2();
    console.log("setTimeout j end");
    setTimeout(function(){
        console.log("setTimeout i");
        loop();
        console.log("setTimeout i end");
    }, 5000);
}, 5000);


var loop = function (){
    if(i== 10){
        return;
    } else{
        console.log({i});
        i++;
        process.nextTick(loop);
    }
}





