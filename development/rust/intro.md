---
head:
  - - meta
    - name: description
      content: Rust documentation and comments.
  - - meta
    - name: keywords
      content: rust
---

# Rust

> I'm learning Rust, and I'm going to write about it here what I learn and what I think about it.
> https://github.com/rytsh/rust00

Check this link for intro https://www.rust-lang.org/learn

- https://doc.rust-lang.org/book/
- https://doc.rust-lang.org/reference/
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

## Cargo New Package

```sh
cargo new hello_cargo
```

This will create a new directory with the name `hello_cargo` and a new Rust package inside it.

```sh
cd hello_cargo
```

Run cargo build

```sh
cargo build
```

It is creating under the `target/debug` directory.

Use `cargo build --release` for release build.

`--bin` is for binary and `--lib` is for library use when creating new package.

```sh
cargo new hello_bin --bin
cargo new hello_lib --lib
```

Default work like `--bin`.

Clear artifacts with `cargo clean`.

## u128

Rust has 128 bit signed and unsigned integers.
