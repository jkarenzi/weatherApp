export interface IQuery {
    key: string,
    query: string
}

export interface IHour {
    condition:{
        icon:string,
        text:string
    },
    time: string
}

export interface IDay {
    day:{
        condition:{
            icon:string,
            text:string
        },
    },
    hour: IHour[],
    date:string
}

export interface ICurrent {
    condition:{
        icon:string,
        text:string
    },
    temp_c : string
}

export interface ILocation {
    name:string,
    country:string
}

export interface WeatherData {
    current: ICurrent,
    location: ILocation,
    forecast:{
        forecastday: IDay[]
    }
}

export interface InitialState {
    isLoading: boolean,
    error:string,
    current: ICurrent | null,
    location: ILocation | null,
    forecast: IDay | null,
    days: IDay[]
}