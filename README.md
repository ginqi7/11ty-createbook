[Eleventy](https://github.com/11ty/eleventy) is a simpler static site generator.

This project is an Eleventy template for creating books, inspired by [Writebook](https://once.com/writebook).

- Easily create a book by creating a directory and writing markdown files.
- Support books in English and Chinese.

I've placed the demo books in the demo branch; you can check the `demo` branch for the book details.

You can find the details of the demo books [here](https://github.com/ginqi7/11ty-createbook/tree/demo/books).

## Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=11ty-createbook&s=https%3A%2F%2Fgithub.com%2Fginqi7%2F11ty-createbook)

- [Demo](https://11ty-createbook.vercel.app)

## Getting Started

### Clone the repository

```
git clone https://github.com/ginqi7/11ty-createbook
```

### Navigate to the directory

```
cd 11ty-createbook
```

### Write books.
```
cd books
mkdir "Your First Book"
cd "Your First Book"
vim "Firest Chapter.md"
```

You can view the details of my demo books [here](https://github.com/ginqi7/11ty-createbook/tree/demo/books).

### Install dependencies

```
npm install
```

### Run Eleventy


Generate a production-ready build to the `_site` folder:

```
npx @11ty/eleventy
```

Or build and host on a local development server:

```
npx @11ty/eleventy --serve
```

## Docker
By utilizing the Docker image, you can write books without needing the 11ty-createbook directory.
### Build
```
 git clone https://github.com/ginqi7/11ty-createbook.git 11ty-createbook
 cd 11ty-createbook
 docker build -t 11ty-createbook .
```


### Start Serve
In your books directory:
```
docker run -p 8080:8080 -v $(pwd):/app/books 11ty-createbook
```

### Start export
In your books directory:
```
docker run -v $(pwd):/app/books -v $(pwd)/_site:/app/_site 11ty-createbook npx eleventy 
```

