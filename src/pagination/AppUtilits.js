import _ from 'lodash';



export const returnPaginationRange = (totalPage, page, limit, siblings) => {

    let totalPageNoInArray = 7 + siblings;
    if(totalPageNoInArray >= totalPage){
        return _.range(1, totalPage + 1);
    }
    let leftSiblingsIndex = Math.max(page - siblings, 1);
    let rightiblingsIndex = Math.min(page + siblings, totalPage);

    let showLeftDots = leftSiblingsIndex > 2;
    let showrightDots = rightiblingsIndex > 2;

    if(!showLeftDots && showrightDots) {
        let leftItemsCount = 3 + 2 * siblings;
        let leftRang = _.range(1, leftItemsCount + 1);
        return [...leftRang, "...", totalPage];
    }else if(showLeftDots && !showrightDots) {
        let rightItemsCount = 3 + 2 * siblings;
        let rightRang = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
        return [1,"...", ...rightRang];
    }else{
        let middleRange = _.range(leftSiblingsIndex, rightiblingsIndex + 1);
        return [1, "...", ...middleRange, "...", totalPage];
    }

}