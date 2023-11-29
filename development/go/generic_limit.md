# go generic for limiting specific types

When working with a generic type, first thing to think about stuct types and union of interfaces.  
There is another simple way to limit the type of generic type with interfaces with some tricks and probably take care of the inside of the function.

Best part of the generic, we can define the return type on function call.  
Let's create a simple generic function that will return the type of the input.

```go
func GenericType[T any]() T {
    return t
}
```

This function will return the type of the function. We can still use internally reflect package for initializing the type.

This `any` is not good for our function. So we need to limit the type with interfaces.

```go
type myType interface {
    myMethod() myPrivateType
}
```

Now we can use this interface as a generic type. I did it on purpose private of myMethod to prevent using it outside of the package.

```go
func GenericType[T myType]() T {
    return t
}
```

Now `T` type should implement `myMethod` method.  
If you are using interface as type, it is not needed to implementation, just existance of the method is enough because it cannot callable from outside of the package.

I have these interfaces, and `myType` interface embeded to both of them.

```go
type Worker1 interface {
    Work1() string

    myType
}

type Worker2 interface {
    Work2() string

    myType
}
```

Now I can just use `Worker1` and `Worker2` as parameter and not allowed to use other types.

```go
v1 := code.GenericType[code.Worker1]()
v2 := code.GenericType[code.Worker2]()

v1.Work1()
v2.Work2()
```
