# Rust

> I'm learning Rust, and I'm going to write about it here what I learn and what I think about it.

Check this link for intro https://www.rust-lang.org/learn

- https://doc.rust-lang.org/book/
- https://doc.rust-lang.org/rust-by-example/
- https://doc.rust-lang.org/cargo/index.html

## Installation

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

For update use `rustup update`.

After that it is adding in your env values in `.bashrc`. Need to refresh your terminal.

## 01 - Hello World

```rust
fn main() {
    println!("Hello, world!");
}
```

Create executable file with this command:

```sh
# generate executable file with name hello
rustc hello.rs
```

Extension of Rust files is `.rs`.

For generating Obj file

```sh
# generate obj file with name hello.o
rustc --emit=obj hello.rs
```
