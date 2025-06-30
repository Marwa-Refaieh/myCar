export const countActiveFilters = (filters = {}) => {
    let count = 0;
    if (filters.sort) count++;
    if (filters.type) count++;
    if (filters.brand_id) count++;
    if ((filters.year_production?.from ?? 1970) !== 1970 || filters.year_production?.to != null) count++;
    if ((filters.odometer?.from ?? 0) !== 0 || filters.odometer?.to != null) count++;
    if ((filters.price?.from ?? 0) !== 0 || filters.price?.to != null) count++;
    if (filters.transmission_type) count++;
    if (filters.fuel_type) count++;
    if (filters.body_type) count++;
    if (filters.color) count++;
    if ((filters.horsepower?.from ?? 0) !== 0 || filters.horsepower?.to != null) count++;
    if ((filters.features?.length ?? 0) > 0) count++;
    if (filters.city_id) count++;
    return count;
};

export const getOrdersFromSort = (sortValue) => {
    switch (sortValue) {
        case 'newest':
            return [{ name: 'year_production', direction: 'desc' }];
        case 'name':
            return [{ name: 'name', direction: 'asc' }];
        case 'price-lowest':
            return [{ name: 'price', direction: 'asc' }];
        case 'price-highest':
            return [{ name: 'price', direction: 'desc' }];
        default:
            return [];
    }
};

export const buildFiltersArray = (filters) => {
    const result = [];

    if (Array.isArray(filters?.features) && filters.features.length > 0) {
        result.push({ name: "features", operation: "in", value: filters.features });
    }

    if (filters?.year_production?.from != null && filters.year_production.to != null) {
        result.push({ name: "year_production", value: filters.year_production });
    }

    if (filters?.type) {
        result.push({ name: "type", value: filters.type });
    }

    if (filters?.transmission_type) {
        result.push({ name: "transmission_type", value: filters.transmission_type });
    }

    if (filters?.body_type) {
        result.push({ name: "body_type", value: filters.body_type });
    }

    if (filters?.fuel_type) {
        result.push({ name: "fuel_type", value: filters.fuel_type });
    }

    if (filters?.city_id) {
        result.push({ name: "city_id", value: filters.city_id });
    }

    if (filters?.model_id) {
        result.push({ name: "model_id", value: filters.model_id });
    }

    if (filters?.brand_id) {
        result.push({ name: "brand_id", value: filters.brand_id });
    }

    if (filters?.odometer?.from != null && filters.odometer.to != null) {
        result.push({ name: "odometer", value: filters.odometer });
    }

    if (filters?.price?.from != null && filters.price.to != null) {
        result.push({ name: "price", value: filters.price });
    }

    if (filters?.color) {
        result.push({ name: "color", value: filters.color });
    }

    if (filters?.horsepower?.from != null && filters.horsepower.to != null) {
        result.push({ name: "horsepower", value: filters.horsepower });
    }

    return result;
};

