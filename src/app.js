import { plus } from './plus.js';
import './style.css';

console.log(plus(3, 7));

console.log(dev);
console.log(pro);

let env;
if(process.env.NODE_ENV === "development"){
    env = dev;
} else {
    env = pro;
}

console.log(env);