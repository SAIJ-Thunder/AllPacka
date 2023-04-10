
    const currentTrip = {
        categories: [
            {name: 'food', 
                items:[
                    {name:'oat meal',
                    user: 'Mark',
                    number: 10000,
                    },
                    {name:'trail mix',
                    user: 'Billy',
                    number: Infinity,
                    },
                    {name:'Vegetables',
                    user: 'Sophia',
                    number: 10000,
                    },
                    {name:'Chocolate',
                    user: 'Jackie',
                    number: 10000,
                    },
        ]}, 
            {name: 'shelter', 
                items:[
                    {name:'tent',
                    user: 'Mark',
                    number: 1,
                    },
                    {name:'tarp',
                    user: 'Billy',
                    number: 1,
                    },
                    {name:'RainFly',
                    user: 'Sophia',
                    number: 10000,
                    },
        ]},
        {name: 'misc', 
            items:[
                {name:'speaker',
                user: 'Jackie',
                number: 1,
                }
        ]},
    ]}


    const categories = currentTrip.categories.map(category => {
        return <CategoryComponent items={category.items} category={category.name}/>
    })
    console.log(categories)

