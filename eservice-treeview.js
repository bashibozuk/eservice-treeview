(function(angular){
    'use strict';

    angular
        .module('eservice.treeview', [])
        .directive('eserviceTreeView', ['$compile', function($compile){
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    var _dataHolderName = attrs.scopePlaceholder || 'eserviceTreeview';

                    scope[_dataHolderName] = scope[_dataHolderName] || {};
                    scope[_dataHolderName]['checkboxesMode'] = attrs.checkboxes === 'true';
                    scope[_dataHolderName]['expandAll'] = attrs.expandAll === 'true';
                    scope[_dataHolderName]['showCaretRight'] = function (node) {
                        return (!this.expandAll && !node.expanded && node.children && node.children.length);
                    };

                    scope[_dataHolderName]['showCaretDown'] = typeof  scope[_dataHolderName]['showCaretDown'] == 'function' ?  scope[_dataHolderName]['showCaretDown'] : function (node) {
                        return (this.expandAll || node.expanded) && node.children && node.children.length;
                    };

                    scope[_dataHolderName]['showCheckboxes'] = typeof scope[_dataHolderName]['showCheckboxes'] == 'function' ? scope[_dataHolderName]['showCheckboxes'] : function (node) {
                        return this.checkboxesMode && (!node.children || !node.children.length);
                    }

                    var _onChbClick = attrs.onCheckboxClick || 'onCheckboxClick';
                    scope[_onChbClick] = typeof scope[_onChbClick] == 'function' ? scope[_onChbClick] : angular.noop;
                    var _treeData = attrs.scopeTreeData;
                    var _tpl = '<ul class="eservice-treeview">' +
                                    '<li data-ng-repeat="node in ' + _treeData + '">' +
                                        '<div data-ng-click="node.expanded=!node.expanded">' +
                                            // carret
                                            '<span ng-class="{\'fa\':true,' +
                                                '\'fa-caret-right\':' + _dataHolderName + '.showCaretRight(node),'+
                                                '\'fa-caret-down\':' + _dataHolderName + '.showCaretDown(node),' +
                                                '\'fa-3\': true,' +
                                                '\'et-caret\':true' +
                                            '}"></span>' +
                                            // checkboxes
                                            '<input type="checkbox" data-ng-model="node.checked" class="et-checkbox margin-right-08em" ng-show="' + _dataHolderName + '.showCheckboxes(node)' + '" ng-click="' + _onChbClick + '(node)">'+
                                            // title
                                            '{{node.title}}' +
                                        '</div>' +
                                        '<div ng-show="node.expanded ||'+ scope[_dataHolderName]['expandAll'] +'" eservice-tree-view="true" scope-tree-data="node.children" checkboxes="' +
                                        scope[_dataHolderName]['checkboxesMode'] +'" expand-all="' + scope[_dataHolderName]['expandAll'] + '"></div>'
                                    '</li>' +
                               '</ul>';

                    element.html('').append( $compile( _tpl )( scope ) );

                }
            };
        }]);

})(angular);
