# JSON-based DB API

**🛠️Tech stack:** [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), [Docker](https://www.docker.com/)

This is a simple JSON-based DB API that enabled to save and retrieve movie objects from JSON file.

API provide 2 endpoints:

- `POST /movies`

  - Creates a new record in DB based on provided request body:

  ```
  title: String (max. 255 chars),
  year: String (numeric),
  runtime: String (numeric),
  genre: Array<String>,
  director: String (max. 255 chars),
  *actors: String
  *plot: String
  *posterUrl: String
  ```

\* - optional parameters

JSON responses:

```
{
  "success": "Movie added"
}
```

```
{
    "error": "error message"
}
```
In case of missing attributes you have proper info:
```
{
    "errors": [
        {
            "msg": "No title field",
            "param": "title",
            "location": "body"
        }
    ]
}
```

- `GET /movies`

  - Fetches a list of all movies based on query parameters

  ```
    URL/movies?genres=Action,Drama&duration=120
  ```

  ```
  [
    {
        "id": 23,
        "title": "The Deer Hunter",
        "year": "1978",
        "runtime": "183",
        "genres": [
            "Drama",
            "War"
        ],
        "director": "Michael Cimino",
        "actors": "Robert De Niro, John Cazale, John Savage, Christopher Walken",
        "plot": "An in-depth examination of the ways in which the U.S. Vietnam War impacts and disrupts the lives of people in a small industrial town in Pennsylvania.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzYmRmZTQtYjk2NS00MDdlLTkxMDAtMTE2YTM2ZmNlMTBkXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    },
    {
        "id": 94,
        "title": "Gandhi",
        "year": "1982",
        "runtime": "191",
        "genres": [
            "Biography",
            "Drama"
        ],
        "director": "Richard Attenborough",
        "actors": "Ben Kingsley, Candice Bergen, Edward Fox, John Gielgud",
        "plot": "Gandhi's character is fully explained as a man of nonviolence. Through his patience, he is able to drive the British out of the subcontinent. And the stubborn nature of Jinnah and his commitment towards Pakistan is portrayed.",
        "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMzJiZDRmOWUtYjE2MS00Mjc1LTg1ZDYtNTQxYWJkZTg1OTM4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
    },
    {
        "id": 144,
        "title": "The Hateful Eight",
        "year": "2015",
        "runtime": "187",
        "genres": [
            "Crime",
            "Drama",
            "Mystery"
        ],
        "director": "Quentin Tarantino",
        "actors": "Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh, Walton Goggins",
        "plot": "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_SX300.jpg"
    }
  ]
  ```

If we provide only genres parameter, then it returns all movies that contain at least one of the specified genres. Also movies are orderd by a number of genres they match. For example if we send a request with genres [Comedy, Fantasy, Crime] then the top hits are movies that have all three of them, then there are movies that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only.

If we provide both duration and genres parameter, then we get the same result as for genres parameter only, but narrowed by a runtime. So API returns only those movies that contain at least one of the specified genres and have a runtime between <duration - 10> and <duration + 10>.
