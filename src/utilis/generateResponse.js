

const Data = async (members = []) => {

    return members.map((item) => {
        return {
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            timestamp: {
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }
        }
    });
};
const mealsData = async (meals = []) => {

    return meals.map((item) => {
        return {
            id: item._id,
            member_id: item.member_id,
            date: item.date,
            type: item.type,
            price: item.price,
            description: item.description,
            timestamp: {
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }
        }
    });
};

const productsData = async (products = []) => {

    return products.map((item) => {
        return {
            id: item._id,
            name: item.name,
            price: item.price,
            description: item.description,
            timestamp: {
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }
        }
    });
};

const noticesData = async (notices = []) => {

    return notices.map((item) => {
        return {
            id: item._id,
            title: item.title,
            body: item.body,
            timestamp: {
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }
        }
    });
};

const mealsSummary = async (meals = []) => {
    let breakfastCount = 0;
    let lunchCount = 0;
    let dinnerCount = 0;
    let totalMeals = 0;
    let totalCost = 0;
    meals.forEach((meal) => {
        totalMeals++;
        totalCost += meal.price;

        switch (meal.type) {
            case 'breakfast':
                breakfastCount++;
                break;
            case 'lunch':
                lunchCount++;
                break;
            case 'dinner':
                dinnerCount++;
                break;
        }
    });


    const meals_Summary = {
        meals_consumed: totalMeals,
        breakfast: breakfastCount,
        lunch: lunchCount,
        dinner: dinnerCount,
        meals_cost: totalCost,
    };

    return meals_Summary;

}

const accountsSummary = async (transactions = [], totalCost) => {


    let totalDeposit = 0;
    transactions.forEach((transaction) => {
        totalDeposit += transaction.deposit_amount;
    });

    const due = totalCost - totalDeposit;
    const accountSummary = {
        total_deposit: totalDeposit,
        total_cost: totalCost,
        due: due >= 0 ? due : 0,
        return: due < 0 ? Math.abs(due) : 0,
    };

    return accountSummary;

}

const productsSummay = async (products = [], meals_cost) => {

    let totalProductCost = 0;
    products.forEach((product) => {
        totalProductCost += product.price;
    });

    const loss = totalProductCost - meals_cost;
    const productsSummary = {
        totalProductCost: totalProductCost,
        loss: loss >= 0 ? loss : 0,
        profit: loss < 0 ? Math.abs(loss) : 0,
    };

    return productsSummary
}

module.exports = {
    Data,
    mealsData,
    productsData,
    noticesData,
    mealsSummary,
    accountsSummary,
    productsSummay,
}