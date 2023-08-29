export function getSavedfilterValues() {
    const savedfilterValues = JSON.parse(localStorage.getItem('filterValues'));
    if (savedfilterValues) {
        return savedfilterValues;
    }
    return savedfilterValues ? savedfilterValues : {text: '', isShortMovie: false};
}
