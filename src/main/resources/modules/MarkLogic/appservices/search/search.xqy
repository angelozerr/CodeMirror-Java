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

module namespace search="http://marklogic.com/appservices/search";

declare function search:check-options($options as element(opt:options)?) as element(resp:report)* external;
declare function search:check-options($options as element(opt:options)?, $strict as xs:boolean?) as element(resp:report)* external;
declare function search:check-options() as element(resp:report)* external;
declare function search:estimate($cts-query as schema-element(cts:query)) as xs:unsignedLong external;
declare function search:estimate($cts-query as schema-element(cts:query), $options as element(opt:options)?) as xs:unsignedLong external;
declare function search:get-default-options() as element (opt:options) external;
declare function search:parse($qtext as xs:string+) as element()? external;
declare function search:parse($qtext as xs:string+, $options as element(opt:options)?) as element()? external;
declare function search:remove-constraint($qtext as xs:string, $ptext as xs:string) as xs:string? external;
declare function search:remove-constraint($qtext as xs:string, $ptext as xs:string, $options as element(opt:options)?) as xs:string? external;
declare function search:resolve($cts-query as schema-element(cts:query)) as element(resp:response) external;
declare function search:resolve($cts-query as schema-element(cts:query), $options as element(opt:options)?) as element(resp:response) external;
declare function search:resolve($cts-query as schema-element(cts:query), $options as element(opt:options)?, $start as xs:unsignedLong?) as element(resp:response) external;
declare function search:resolve($cts-query as schema-element(cts:query), $options as element(opt:options)?, $start as xs:unsignedLong?, $page-length as xs:unsignedLong?) as element(resp:response) external;
declare function search:resolve-nodes($cts-query as schema-element(cts:query)) as node()* external;
declare function search:resolve-nodes($cts-query as schema-element(cts:query), $options as element(opt:options)?) as node()* external;
declare function search:resolve-nodes($cts-query as schema-element(cts:query), $options as element(opt:options)?, $start as xs:unsignedLong?) as node()* external;
declare function search:resolve-nodes($cts-query as schema-element(cts:query), $options as element(opt:options)?, $start as xs:unsignedLong?, $page-length as xs:unsignedLong?) as node()* external;
declare function search:search($qtext as xs:string+) as element(resp:response) external;
declare function search:search($qtext as xs:string+, $options as element(search:options)?) as element(resp:response) external;
declare function search:search($qtext as xs:string+, $options as element(search:options)?, $start as xs:unsignedLong?) as element(resp:response) external;
declare function search:search($qtext as xs:string+, $options as element(search:options)?, $start as xs:unsignedLong?, $page-length as xs:unsignedLong?) as element(resp:response) external;
declare function search:snippet($result as node(), $cts-query as schema-element(cts:query)) as element(search:snippet)? external;
declare function search:snippet($result as node(), $cts-query as schema-element(cts:query), $options as element(opt:options)?) as element(search:snippet)? external;
declare function search:suggest($qtext as xs:string+) as xs:string* external;
declare function search:suggest($qtext as xs:string+, $options as element(opt:options)?) as xs:string* external;
declare function search:suggest($qtext as xs:string+, $options as element(opt:options)?, $limit as xs:unsignedInt?) as xs:string* external;
declare function search:suggest($qtext as xs:string+, $options as element(opt:options)?, $limit as xs:unsignedInt?, $cursor-position as xs:unsignedInt?) as xs:string* external;
declare function search:suggest($qtext as xs:string+, $options as element(opt:options)?, $limit as xs:unsignedInt?, $cursor-position as xs:unsignedInt?, $focus as xs:positiveInteger?) as xs:string* external;
declare function search:unparse($cts-query as schema-element(cts:query)) as xs:string+ external;
