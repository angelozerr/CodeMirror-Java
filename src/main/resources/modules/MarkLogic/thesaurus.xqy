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

module namespace thsr="http://marklogic.com/xdmp/thesaurus";

declare function thsr:add-synonym($entry as element(thsr:entry), $synonym as element(thsr:synonym)) as  empty-sequence()  external;
declare function thsr:expand($query as cts:query, $entries as element(thsr:entry)*, $new-weight as xs:double?, $min-weight as xs:double?, $filter as node()*) as cts:query  external;
declare function thsr:insert($uri as xs:string, $thsr as element(thsr:thesaurus)) as  empty-sequence()  external;
declare function thsr:load($path as xs:string, $uri as xs:string) as  empty-sequence()  external;
declare function thsr:lookup($uri as xs:string*, $term as xs:string) as element(thsr:entry)* external;
declare function thsr:query-lookup($uri as xs:string*, $query as cts:query) as element(thsr:entry)* external;
declare function thsr:remove-entry($uri as xs:string*, $entry as element(thsr:entry)) as  empty-sequence()  external;
declare function thsr:remove-synonym($entry as element(thsr:entry), $synonym as element(thsr:synonym)) as  empty-sequence()  external;
declare function thsr:remove-term($uri as xs:string*, $term as xs:string) as  empty-sequence()  external;
declare function thsr:set-entry($uri as xs:string, $entry as element(thsr:entry)) as  empty-sequence()  external;
