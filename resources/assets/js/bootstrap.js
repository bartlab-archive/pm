import 'babel-polyfill';
// import 'jquery-mousewheel';
// import 'malihu-custom-scrollbar-plugin';
// import jQuery from 'jquery';

// window.$ = window.jQuery = jQuery;

// window.getWatchersCount = () => {
//     let root = angular.element(document.getElementsByTagName('body'));
//     let watchers = [];
//     let f = (element) => {
//         angular.forEach(['$scope', '$isolateScope'], (scopeProperty) => {
//             if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
//                 angular.forEach(element.data()[scopeProperty].$$watchers, (watcher) => {
//                     watchers.push(watcher);
//                 });
//             }
//         });
//
//         angular.forEach(element.children(), (childElement) => {
//             f(angular.element(childElement));
//         });
//     };
//
//     f(root);
//
//     // Remove duplicate watchers
//     let watchersWithoutDuplicates = [];
//     angular.forEach(watchers, (item) => {
//         if (watchersWithoutDuplicates.indexOf(item) < 0) {
//             watchersWithoutDuplicates.push(item);
//         }
//     });
//
//     return watchersWithoutDuplicates.length;
// };
//
// window.reloadWithDebugInfo = ()=>{
//     angular.reloadWithDebugInfo();
// };