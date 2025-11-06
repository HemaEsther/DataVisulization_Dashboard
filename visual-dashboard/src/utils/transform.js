export const deriveOptions = (items) => {
  const set = (field) => [...new Set(items.map(i => (i[field] || '').toString()).filter(Boolean))].sort();
  return {
    regions: set('region'),
    topics: set('topic'),
    sectors: set('sector'),
    countries: set('country'),
    cities: set('city'),
    years: set('end_year').concat(set('start_year')).filter(Boolean)
  };
};
