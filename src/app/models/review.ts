export class Review{
    constructor(
        public _id: String,
        public name: String,
        public text: String,
        public rate: Number,
        public product: String,
        public date: String
    ){}
}