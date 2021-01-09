export default class Data{
    constructor(url){
        this.url = url;

        this.PARAM = {
            cat: 'category',
            subcat: 'subcategory',
            optionSearch: ['name', 'description', 'category', 'subcategory']
        }
    }

    get(cb){
        fetch(this.url)
            .then(res => {
                if(!res.ok){
                    throw new Error('Error: ', res.status)
                } else{
                    return res.json()
                }
            })
            .then(cb)
    }

    whishList(list, cb){
        this.get((data) => {
            const result = data.filter(item => list.includes(item.id));
            return cb(result)
        })
    }

    item(id, cb){
        this.get((data) => {
            const result = data.find(item => item.id === id)
            return cb(result)
        })
    }

    catalogList(value, prop, cb) {
        this.get((data) => {
            const result = data
                .filter(item => item[this.PARAM[prop]].toLowerCase() === value.toLowerCase());

            return cb(result)
        })
    }

    cart(list, cb){
        this.get((data) => {
            const result = data.filter(item => list.some(obj => obj.id === item.id))
            return cb(result)
        })
    }

    search(value, cb){
        this.get((data) => {
            const result = data.filter(item => {
                for(const prop in item){
                    if (this.PARAM.optionSearch.includes(prop) &&
                    item[prop].toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                }
            })
            return cb(result)
        })
    }

    getCategory(cb) {
        this.get((data) => {
            const result = data.reduce((arr, {
                category
            }) => {
                if (!arr.includes(category)) {
                    arr.push(category);
                }
                return arr;
            }, []);
            return cb(result)
        })
    }

    getSubcategory(value, cb) {
        this.get((data) => {
            const result = data
                    .filter(({category}) => category === value)
                    .reduce((arr, {subcategory}) => {
                        if (!arr.includes(subcategory)){
                            arr.push(subcategory)
                        }
                        return arr
                    }, [])
            return cb(result);
        });
    }
}