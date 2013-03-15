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

module namespace p="http://marklogic.com/cpf/pipelines";

declare function p:action($module as xs:string, $description as xs:string?, $options as element()?) as  element(p:status-transition)  external;
declare function p:collection() as  element(p:pipeline)*  external;
declare function p:condition($module as xs:string, $description as xs:string?, $options as element()?) as  element(p:status-transition)  external;
declare function p:create($name as xs:string, $description as xs:string, $success-action as element(p:action)?, $failure-action as element(p:action)?, $status-transitions as element(p:status-transition)*, $state-transitions as element(p:state-transition)*) as  xs:unsignedLong  external;
declare function p:execute($condition as element(p:condition)?, $action as element(p:action)?, $description as xs:string?) as  element(p:status-transition)  external;
declare function p:get($pipeline-name as xs:string) as  element(p:pipeline)  external;
declare function p:get-by-id($pipeline-id as xs:unsignedLong) as  element(p:pipeline)  external;
declare function p:insert($pipeline as element(p:pipeline)) as  xs:unsignedLong  external;
declare function p:pipelines() as  element(p:pipeline)*  external;
declare function p:remove($pipeline-name as xs:string) as  empty-sequence()  external;
declare function p:state-transition($state as xs:anyURI, $description as xs:string, $on-success as xs:anyURI?, $on-failure as xs:anyURI?, $priority as xs:unsignedLong?, $default-action as element(p:action)?, $rules as element(p:execute)*) as  element(p:state-transition)  external;
declare function p:status-transition($status as xs:string, $description as xs:string, $on-success as xs:anyURI?, $on-failure as xs:anyURI?, $priority as xs:unsignedLong?, $default-action as element(p:action)?, $rules as element(p:execute)*) as  element(p:status-transition)  external;
