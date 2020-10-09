removed
+ @babel/plugin-proposal-numeric-separator
+ @babel/plugin-proposal-export-namespace-from
+ @babel/plugin-proposal-function-sent
+ @babel/plugin-transform-destructuring

@babel/plugin-proposal-numeric-separator

```
let budget = 1_000_000_000_000;

// What is the value of `budget`? It's 1 trillion!
//
// Let's confirm:
console.log(budget === 10 ** 12); // true
```


@babel/plugin-proposal-export-namespace-from
https://github.com/tc39/proposal-export-ns-from
basically sunset



@babel/plugin-proposal-function-sent
cool I guess but why
```
function* generator() {
    console.log("Sent", function.sent);
    console.log("Yield", yield);
}

const iterator = generator();
iterator.next(1); // Logs "Sent 1"
iterator.next(2); // Logs "Yield 2"
```

@babel/plugin-proposal-throw-expressions
As Nick would say, syntax sugar
```
function test(param = throw new Error('required!')) {
  const test = param === true || throw new Error('Falsy!');
}
```

@babel/plugin-transform-destructuring

I thought this one was built-in now?
