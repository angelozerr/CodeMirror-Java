xquery version "1.0-ml";

(: Copyright (c) 2002-2009 Mark Logic Corporation. All rights reserved.
 : 
 :  This program and the accompanying materials are made available
 :  under the terms of the Eclipse Public License v1.0 which
 :  accompanies this distribution, and is available at
 :  http://www.eclipse.org/legal/epl-v10.html
 : 
 :  Contributors:
 :      Mark Logic, Inc.
 :)

module namespace alert="http://marklogic.com/xdmp/alert";

declare function alert:action-get-description($action as element(alert:action)) as xs:string external;
declare function alert:action-get-module($action as element(alert:action)) as xs:string external;
declare function alert:action-get-module-db($action as element(alert:action)) as xs:unsignedLong external;
declare function alert:action-get-module-root($action as element(alert:action)) as xs:unsignedLong external;
declare function alert:action-get-name($action as element(alert:action)) as xs:string external;
declare function alert:action-get-options($action as element(alert:action)) as element(alert:options) external;
declare function alert:action-insert($config-uri as xs:string, $action as element(alert:action)) as empty-sequence() external;
declare function alert:action-remove($config-uri as xs:string, $name as xs:string) as empty-sequence() external;
declare function alert:action-set-description($action as element(alert:action), $description as xs:string) as element(alert:action) external;
declare function alert:action-set-module($action as element(alert:action), $module as xs:string) as element(alert:action) external;
declare function alert:action-set-module-db($action as element(alert:action), $module-db as xs:unsignedLong) as element(alert:action) external;
declare function alert:action-set-module-root($action as element(alert:action), $module-root as xs:string) as element(alert:action) external;
declare function alert:action-set-name($action as element(alert:action), $name as xs:string) as element(alert:action) external;
declare function alert:action-set-options($action as element(alert:action), $options as element(alert:options)) as element(alert:action) external;
declare function alert:config-delete($uri as xs:string) as empty-sequence() external;
declare function alert:config-get($uri as xs:string) as element(alert:config)? external;
declare function alert:config-get-cpf-domain-ids($config as element(alert:config)) as xs:unsignedLong* external;
declare function alert:config-get-cpf-domain-names($config as element(alert:config)) as xs:unsignedLong* external;
declare function alert:config-get-description($config as element(alert:config)) as xs:string external;
declare function alert:config-get-id($config as element(alert:config)) as xs:string external;
declare function alert:config-get-name($config as element(alert:config)) as xs:string external;
declare function alert:config-get-options($config as element(alert:config)) as element(alert:options) external;
declare function alert:config-get-trigger-ids($config as element(alert:config)) as xs:unsignedLong* external;
declare function alert:config-get-uri($config as element(alert:config)) as xs:string external;
declare function alert:config-insert($config as element(alert:config)) as empty-sequence() external;
declare function alert:config-set-cpf-domain-ids($config as element(alert:config), $ids as xs:unsignedLong*) as element(alert:config) external;
declare function alert:config-set-cpf-domain-names($config as element(alert:config), $names as xs:string*) as element(alert:config) external;
declare function alert:config-set-description($config as element(alert:config), $description as xs:string) as element (alert:config) external;
declare function alert:config-set-name($config as element(alert:config), $name as xs:string) as element (alert:config) external;
declare function alert:config-set-options($config as element(alert:config), $options as element(alert:options)) as element(alert:config) external;
declare function alert:config-set-trigger-ids($config as element(alert:config), $ids as xs:unsignedLong*) as element(alert:config) external;
declare function alert:config-set-uri($config as element(alert:config), $uri as xs:string) as element (alert:config) external;
declare function alert:create-triggers($uri as xs:string, $events as element(trgr:data-event)*) as xs:unsignedLong* external;
declare function alert:find-matching-rules($config-uri as xs:string, $doc as node()) as element(alert:rule)* external;
declare function alert:get-actions($config-uri as xs:string, $names as xs:string*) as element(alert:action)* external;
declare function alert:get-all-rules($config-uri as xs:string, $query as cts:query) as element(alert:rule)* external;
declare function alert:get-my-rules($config-uri as xs:string, $query as cts:query) as element(alert:rule)* external;
declare function alert:invoke-matching-actions($config-uri as xs:string, $doc as node(), $options as node()) as empty-sequence() external;
declare function alert:make-action($name as xs:string, $description as xs:string, $module-db as xs:unsignedLong, $module-root as xs:string, $module as xs:string, $options as element(alert:options)) as element(alert:action) external;
declare function alert:make-config($uri as xs:string, $name as xs:string, $description as xs:string, $options as element(alert:options)) as element(alert:config) external;
declare function alert:make-log-action() as element(alert:action) external;
declare function alert:make-rule($name as xs:string, $description as xs:string, $user-id as xs:unsignedLong, $query as cts:query, $action as xs:string, $options as element(alert:options)) as element(alert:rule) external;
declare function alert:remove-triggers($uri as xs:string) as empty-sequence() external;
declare function alert:rule-action-query($actions as xs:string*) as cts:query external;
declare function alert:rule-get-action($rule as element(alert:rule)) as xs:string external;
declare function alert:rule-get-description($rule as element(alert:rule)) as xs:string external;
declare function alert:rule-get-id($rule as element(alert:rule)) as xs:unsignedLong external;
declare function alert:rule-get-name($rule as element(alert:rule)) as xs:string external;
declare function alert:rule-get-options($rule as element(alert:rule)) as element(alert:options) external;
declare function alert:rule-get-query($rule as element(alert:rule)) as cts:query external;
declare function alert:rule-get-user-id($rule as element(alert:rule)) as xs:unsignedLong external;
declare function alert:rule-id-query($ids as xs:unsignedLong*) as cts:query external;
declare function alert:rule-insert($config-uri as xs:string, $rule as element(alert:rule)) as empty-sequence() external;
declare function alert:rule-name-query($names as xs:string*) as cts:query external;
declare function alert:rule-remove($config-uri as xs:string, $id as xs:unsignedLong) as empty-sequence() external;
declare function alert:rule-set-action($rule as element(alert:rule), $action as xs:string) as element(alert:rule) external;
declare function alert:rule-set-description($rule as element(alert:rule), $description as xs:string) as element(alert:rule) external;
declare function alert:rule-set-name($rule as element(alert:rule), $name as xs:string) as element(alert:rule) external;
declare function alert:rule-set-options($rule as element(alert:rule), $options as element(alert:options)) as element(alert:rule) external;
declare function alert:rule-set-query($rule as element(alert:rule), $query as cts:query) as element(alert:rule) external;
declare function alert:rule-set-user-id($rule as element(alert:rule), $user-id as xs:unsignedLong) as element(alert:rule) external;
declare function alert:rule-user-id-query($user-ids as xs:unsignedLong*) as cts:query external;
declare function alert:spawn-matching-actions($config-uri as xs:string, $doc as node(), $options as node()) as empty-sequence() external;
