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

module namespace spell="http://marklogic.com/xdmp/spell";

declare function spell:double-metaphone($word as xs:string) as xs:string* external;
declare function spell:is-correct($uri as xs:string*, $word as xs:string) as xs:boolean external;
declare function spell:levenshtein-distance($str1 as xs:string, $str2 as xs:string) as xs:integer? external;
declare function spell:suggest($uri as xs:string*, $word as xs:string) as xs:string* external;
declare function spell:suggest($uri as xs:string*, $word as xs:string, $options as node()?) as xs:string* external;
declare function spell:suggest-detailed($uri as xs:string*, $word as xs:string) as spell:suggestion* external;
declare function spell:suggest-detailed($uri as xs:string*, $word as xs:string, $options as node()?) as spell:suggestion* external;
