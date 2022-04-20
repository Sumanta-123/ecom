export const products = [
    {
        id: 1,
        name: "Nokia 8.1 plus nosle edge",
        description: "Product description is here for product 1",
        category: "Mobile",
        price: 17000,
        quantity: 4,
        item_details: {
            units: "GB",
            color: "Black",
            storage: 256, 
        },
        sold: false,
        offer: {
            discount: "2%",
            save_up_to: 1000,
            free:1,
            description: "This offer is validate till to April 31 2022"
        },
        images: ["../../../public/julien-pianetti.jpeg", "../../../public/mae-mu.jpeg", "../../../public/mockup-graphics.jpeg", "../../../public/roberta-sorge.jpeg", "../../../public/surendran-mp.jpeg"],
        viewers: [{
            username: "user1@revvsales.com",
            rating: 5,
            like: true,
            comments: ["1st comments", "2nd comments"],
            images: []
        }],
    },
    {
        id: 1,
        name: "Men large size pajama",
        description: "Product description is here for product 2",
        category: "Men",
        price: 234,
        quantity: 4,
        item_details: {
            units: "XL",
            color: "Blue",
            storage: 0,
        },
        sold: false,
        offer: {
            discount: "2%",
            save_up_to: 1000,
            free:1,
            description: "This offer is validate till to April 31 2022"
        },
        images: [],
        viewers: [{
            username: "user1@revvsales.com",
            rating: 3,
            like: true,
            comments: ["1st comments", "2nd comments"],
            tag_images: []
        }],
    },
]