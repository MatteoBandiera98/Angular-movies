export interface Authdata {
    accessToken : string ,
    user : {
        name : string ,
        id: number ,
        email:string
    }
}
export interface Favourite {
    movieId: number;
    userId: number;
    id?: number;
}
export interface Movie {
    id: number,
    poster_path: string,
    title: string,
    overview: string,
    genre_ids: number[]
}

export interface Auth {
    accessToken: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export interface Utente {
    name: string,
    email: string
}

export interface Genres {
    [key: number]: string;
  }