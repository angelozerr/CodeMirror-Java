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

module namespace map="http://marklogic.com/xdmp/map";

declare function map:clear($map as map:map) as empty-sequence() external;
declare function map:count($map as map:map) as xs:unsignedInt external;
declare function map:delete($map as map:map, $key as xs:string) as empty-sequence() external;
declare function map:get($map as map:map, $key as xs:string) as item()* external;
declare function map:keys($map as map:map) as xs:string* external;
declare function map:map($map as element(map:map)) as map:map external;
declare function map:map() as map:map external;
declare function map:put($map as map:map, $key as xs:string, $value as item()*) as empty-sequence() external;
