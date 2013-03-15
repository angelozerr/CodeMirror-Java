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

module namespace trgr="http://marklogic.com/xdmp/triggers";

declare function trgr:any-property-content() as element(trgr:any-property-content) external;
declare function trgr:collection-scope($uri as xs:string) as element(trgr:collection-scope) external;
declare function trgr:create-trigger($trigger-name as xs:string, $description as xs:string?, $event as element(), $module as element(trgr:module), $enabled as xs:boolean, $permissions as element(sec:permission)*) as xs:unsignedLong external;
declare function trgr:create-trigger($trigger-name as xs:string, $description as xs:string?, $event as element(), $module as element(trgr:module), $enabled as xs:boolean, $permissions as element(sec:permission)*, $recursive as xs:boolean?) as xs:unsignedLong external;
declare function trgr:directory-scope($uri as xs:string, $depth as xs:string) as element(trgr:directory-scope) external;
declare function trgr:document-content($update-kind as xs:string) as element(trgr:document-content) external;
declare function trgr:document-scope($uri as xs:string) as element(trgr:document-scope) external;
declare function trgr:get-trigger($trigger-name as xs:string) as element(trgr:trigger) external;
declare function trgr:get-trigger-by-id($trigger-id as xs:unsignedLong) as element(trgr:trigger) external;
declare function trgr:post-commit() as element(trgr:when) external;
declare function trgr:pre-commit() as element(trgr:when) external;
declare function trgr:property-content($property-name as xs:QName) as element(trgr:property-content) external;
declare function trgr:remove-trigger($trigger-name as xs:string) as empty-sequence() external;
declare function trgr:trigger-add-permissions($trigger-name as xs:string, $permissions as element(sec:permission)*) as empty-sequence() external;
declare function trgr:trigger-data-event($scope as element(), $content as element(), $when as element(trgr:when)) as element(trgr:data-event) external;
declare function trgr:trigger-database-online-event($user-name as xs:string) as element(trgr:database-online-event) external;
declare function trgr:trigger-disable($trigger-name as xs:string) as empty-sequence() external;
declare function trgr:trigger-enable($trigger-name as xs:string) as empty-sequence() external;
declare function trgr:trigger-get-permissions($trigger-name as xs:string) as element(sec:permission)* external;
declare function trgr:trigger-module($database-id as xs:unsignedLong, $root as xs:string, $path as xs:string) as element(trgr:module) external;
declare function trgr:trigger-remove-permissions($trigger-name as xs:string, $permissions as element(sec:permission)*) as empty-sequence() external;
declare function trgr:trigger-set-description($trigger-name as xs:string, $description as xs:string?) as empty-sequence() external;
declare function trgr:trigger-set-event($trigger-name as xs:string, $event as element()) as empty-sequence() external;
declare function trgr:trigger-set-module($trigger-name as xs:string, $module as element(trgr:module)) as empty-sequence() external;
declare function trgr:trigger-set-name($trigger-name as xs:string, $description as xs:string?) as empty-sequence() external;
declare function trgr:trigger-set-permissions($trigger-name as xs:string, $permissions as element(sec:permission)*) as empty-sequence() external;
declare function trgr:trigger-set-recursive($trigger-name as xs:string, $recursive as xs:boolean) as empty-sequence() external;
