;(function() {

angular.module('enilia.overlay.config', ['ngRoute',
										 'enilia.overlay.tpls',
										 'enilia.overlay.dpsmeter',
										 'enilia.overlay.dbmanager'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/config', {
				templateUrl: 'app/Config/config.html',
				controller: 'configController'
			})
			.when('/config/preset/new', {
				templateUrl:'app/Config/partials/preset.html',
				controller: 'newPresetController'
			})
			.when('/config/preset/:presetId/edit', {
				templateUrl:'app/Config/partials/preset.html',
				controller: 'editPresetController'
			})
			.when('/config/preset/:cloneId/clone', {
				templateUrl:'app/Config/partials/preset.html',
				controller: 'clonePresetController'
			})
	}])

	.controller('configController',
		['$scope', 'presetManager', '$document',
		function configController($scope, presetManager, $document) {

			$scope.presets = presetManager.getAll();
			$scope.selectedPreset = presetManager.get();
			$scope.select = function select(preset) {
				$scope.selectedPreset = presetManager.set(preset);
			}
			$scope.remove = function($event, preset) {
				if($scope.checkRemove === preset) {
					presetManager.remove(preset);
				} else {
					$scope.checkRemove = preset;
					$document.one('click', function() {
						$scope.$apply(function() {
							delete $scope.checkRemove;
						});
					});
					$event.stopPropagation();
				}
			};

		}])

	.controller('editPresetController',
		['$scope', '$routeParams', 'presetManager',
		function configPresetController($scope, $routeParams, presetManager) {

			$scope.title = "编辑(增加减少参数)";

			$scope.preset = angular.copy(presetManager.get(parseInt($routeParams.presetId)));

			$scope.save = function() {
				presetManager.update($scope.preset);
			};

		}])

	.controller('newPresetController',
		['$scope', 'presetManager',
		function configPresetController($scope, presetManager) {

			$scope.title = "创建(新的数据面板)";

			$scope.preset = presetManager.$getDefault();

			$scope.save = function() {
				presetManager.add($scope.preset);
			};

		}])

	.controller('clonePresetController',
		['$scope', '$routeParams', 'presetManager',
		function configPresetController($scope, $routeParams, presetManager) {

			$scope.title = "克隆(点击“√”复制出一个新面板)";

			$scope.preset = angular.copy(presetManager.get(parseInt($routeParams.cloneId)));

			$scope.save = function() {
				presetManager.add($scope.preset);
			};

		}])

	.directive('preventSelection', ['$window',
		function preventSelectionDirective($window) {
			return {
				restrict:'A',
				link:function(scope, element) {
					element.on('mousedown', function() {
						$window.requestAnimationFrame(function() {
							$window.getSelection().removeAllRanges();
						});
					})
				}
			}
		}])

	.directive('autoSelect', ['$window',
		function autoSelectDirective($window) {
			return {
				restrict:'A',
				link:function(scope, element) {
					element.on('click', function() {
						if($window.getSelection().toString().length) return;
						element[0].select();
					})
				}
			}
		}])

	.directive('presetConfig', function presetConfigDirective() {
		return {
			restrict:'E',
			templateUrl:'app/Config/partials/formcontrols/presetConfig.html',
			scope: {
				cols: '='
			},
			controller:['$scope', '$document', 
				function($scope, $document) {

					$scope.colsCollection = [
						{label:  '名称',value: 'name'},
												
						{label:  '秒伤',value: 'ENCDPS'},{label:  '伤害量',value: 'damage'},{label:  '伤害%',value: 'damagePct'},
						{label:  '直击%',value: 'DirectHitPct'},{label:  '直暴击%',value: 'CritDirectHitPct'},
						{label:  '伤暴击%',value: 'crithitPct'},{label:  '伤暴击次',value: 'crithits'},{label:  '最强伤害',value: 'maxhit'},
						{label:  '伤害次',value: 'hits'},{label:  '攻击次',value: 'swings'},{label:  '命中%',value: 'TOHIT'},						
						{label:  '10秒DPS',value: 'Last10DPS'},{label:  '30秒DPS',value: 'Last30DPS'},{label:  '60秒DPS',value: 'Last60DPS'},						
						{label:  '秒疗',value: 'ENCHPS'},{label:  '治疗量',value: 'healed'},{label:  '治疗%',value: 'healedPct'},
						{label:  '疗暴击%',value: 'crithealPct'},{label:  '疗暴击次',value: 'critheals'},{label:  '过量治疗%',value: 'OverHealPct'},
						{label:  '治疗次',value: 'heals'},{label:  '驱散',value: 'cures'},{label:  '最强治疗',value: 'maxheal'},						
						{label:  '承受伤害',value: 'damagetaken'},{label:  '闪避%',value: 'ParryPct'},{label:  '招架%',value: 'BlockPct'},
						{label:  '受到治疗',value: 'healstaken'},{label:  '死亡',value: 'deaths'},{label:  '仇恨',value: 'threatdelta'},							
					];

					$scope.remove = function($event, index) {
						if($scope.removeIndex === index) {
							$scope.cols.splice(index, 1);
						} else {
							$scope.removeIndex = index;
							$document.one('click', function() {
								$scope.$apply(function() {
									$scope.removeIndex = -1;
								});
							});
							$event.stopPropagation();
						}
					};


					$scope.newcol = [{label:  'Name',value: 'name'}];

					$scope.add = function(newcol) {
						$scope.cols.push(angular.copy(newcol));
					}
				}],
		}
	})

	.directive('fieldselect', function fieldselectDirective() {
		return {
			restrict:'E',
			templateUrl:'app/Config/partials/formcontrols/fieldselect.html',
			scope: {
				ngModel: '=',
				options: '=',
				label: '@?',
				value: '@?',
				onChange:'=?',
			},
			controller:['$scope', '$parse',
				function fieldselectController($scope, $parse) {

					var parsedOptions = $scope.parsedOptions = []
					  , getLabel = $scope.label ? ($scope.label === "{key}" ? getKey : $parse($scope.label)) : angular.identity
					  , getValue = $scope.value ? $parse($scope.value) : angular.identity
					  ;

	  				function getKey(option, key) {
	  					return key;
	  				}

					angular.forEach($scope.options, function(option, key) {
						var obj = {
								label:getLabel(option) || getLabel(null, key),
								value:getValue(option)
							};
						if(angular.equals(obj.value, $scope.ngModel)) $scope.selectedLabel = obj.label;
						parsedOptions.push(obj);
					});

					$scope.setSelected = function(option) {
						$scope.ngModel = angular.copy(option.value);
						$scope.selectedLabel = option.label;
						($scope.onChange || angular.identity)(option.value);
					};
				}],
		}
	})

	.directive('checkbox', function checkboxDirective() {
		return {
			restrict:'E',
			templateUrl:'app/Config/partials/formcontrols/checkbox.html',
			scope: {
				checked: '='
			},
			controller:['$scope',
				function checkboxController ($scope) {
				
					$scope.click = function click () {
						$scope.checked = !$scope.checked;
					};

				}],
		}
	})

	.directive('sorter', function sorterDirective() {
		return {
			restrict:'E',
			templateUrl:'app/Config/partials/formcontrols/sorter.html',
			scope: {
				ngModel:'=',
				$index:'=index',
				sortableDirection:'@?',
			},
			controller:['$scope',
				function sorterController ($scope) {

					function setScope() {
						$scope.$first = ($scope.$index === 0);
						$scope.$last = ($scope.$index === ($scope.ngModel.length - 1));
					}

					$scope.$watch('$index', setScope);
					$scope.$watch('ngModel.length', setScope);
				
					$scope.up = function up() {
						if($scope.$first) return;
						var move = $scope.ngModel.splice($scope.$index, 1);
						$scope.ngModel.splice($scope.$index-1, 0, move[0]);
					};
					$scope.down = function down() {
						if($scope.$last) return;
						var move = $scope.ngModel.splice($scope.$index, 1);
						$scope.ngModel.splice($scope.$index+1, 0, move[0]);
					};

				}],
		}
	})

	

})();