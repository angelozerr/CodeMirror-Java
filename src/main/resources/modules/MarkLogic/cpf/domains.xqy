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

module namespace dom="http://marklogic.com/cpf/domains";

declare function dom:add-permissions($domain-name as xs:string, $permissions as element(sec:permissions)*) as  empty-sequence()  external;
declare function dom:add-pipeline($domain-name as xs:string, $pipeline-id as xs:unsignedLong) as  empty-sequence()  external;
declare function dom:collection() as  xs:string  external;
declare function dom:configuration-create($restart-user as xs:string, $evaluation-context as element(dom:evaluation-context), $default-domain as xs:unsignedLong, $permissions as element(sec:permission)*) as xs:unsignedLong external;
declare function dom:configuration-get() as element(dom:domain) external;
declare function dom:configuration-set-default-domain($domain-id as xs:unsignedLong) as empty-sequence() external;
declare function dom:configuration-set-evaluation-context($context as element(dom:evaluation-context)) as empty-sequence() external;
declare function dom:configuration-set-permissions($permissions as element(sec:permission)*) as empty-sequence() external;
declare function dom:configuration-set-restart-user($restart-user as xs:string) as empty-sequence() external;
declare function dom:create($name as xs:string, $description as xs:string, $scope as element(dom:domain-scope), $context as element(dom:evaluation-context), $pipelines as xs:unsignedLong*, $permissions as element(sec:permission)*) as  xs:unsignedLong  external;
declare function dom:domain-scope($document-scope as xs:string, $uri as xs:string, $depth as xs:string?) as  element(dom:domain-scope)  external;
declare function dom:domains() as  element(dom:domain)*  external;
declare function dom:evaluation-context($database as xs:unsignedLong, $root as xs:string) as  element(dom:evaluation-context)  external;
declare function dom:get($domain-name as xs:string) as  element(dom:domain)  external;
declare function dom:remove($domain-name as xs:string) as  empty-sequence()  external;
declare function dom:remove-permissions($domain-name as xs:string, $permissions as element(sec:permissions)*) as  empty-sequence()  external;
declare function dom:remove-pipeline($domain-name as xs:string, $pipeline-id as xs:unsignedLong) as  empty-sequence()  external;
declare function dom:set-description($domain-name as xs:string, $description as xs:string) as  empty-sequence()  external;
declare function dom:set-domain-scope($domain-name as xs:string, $scope as element(dom:domain-scope)) as  empty-sequence()  external;
declare function dom:set-evaluation-context($domain-name as xs:string, $context as element(dom:evaluation-context)) as  empty-sequence()  external;
declare function dom:set-name($domain-name as xs:string, $new-name as xs:string) as  empty-sequence()  external;
declare function dom:set-permissions($domain-name as xs:string, $permissions as element(sec:permissions)*) as  empty-sequence()  external;
declare function dom:set-pipelines($domain-name as xs:string, $pipelines as xs:unsignedLong*) as  empty-sequence()  external;
