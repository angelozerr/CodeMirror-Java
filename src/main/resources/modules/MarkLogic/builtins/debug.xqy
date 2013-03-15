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

module namespace dbg="http://marklogic.com/xdmp/debug";

declare function dbg:attach($request-id as xs:unsignedLong) as empty-sequence() external;
declare function dbg:attached($server as xs:unsignedLong) as xs:unsignedLong* external;
declare function dbg:attached() as xs:unsignedLong* external;
declare function dbg:break($request as xs:unsignedLong) as empty-sequence() external;
declare function dbg:break($request as xs:unsignedLong, $expression as xs:unsignedLong) as empty-sequence() external;
declare function dbg:breakpoints($request as xs:unsignedLong) as xs:usngignedLong* external;
declare function dbg:clear($request as xs:unsignedLong, $expression as xs:unsignedLong) as empty-sequence() external;
declare function dbg:connect($server as xs:unsignedLong) as empty-sequence() external;
declare function dbg:continue($request as xs:unsignedLong) as empty-sequence() external;
declare function dbg:detach($request-id as xs:unsignedLong) as empty-sequence() external;
declare function dbg:disconnect($server as xs:unsignedLong) as empty-sequence() external;
declare function dbg:eval($xquery as xs:string) as xs:unsignedLong external;
declare function dbg:eval($xquery as xs:string, $vars as item()*) as xs:unsignedLong external;
declare function dbg:eval($xquery as xs:string, $vars as item()*, $options as node()?) as xs:unsignedLong external;
declare function dbg:expr($request as xs:unsignedLong, $expression as xs:unsignedLong) as element(dbg:expression) external;
declare function dbg:finish($request as xs:unsignedLong) as empty-sequence() external;
declare function dbg:function($request as xs:unsignedLong, $uri as xs:string, $function as xs:QName) as xs:unsignedLong external;
declare function dbg:invoke($uri as xs:string) as xs:unsignedLong external;
declare function dbg:invoke($uri as xs:string, $vars as item()*) as xs:unsignedLong external;
declare function dbg:invoke($uri as xs:string, $vars as item()*, $options as node()?) as xs:unsignedLong external;
declare function dbg:line($request as xs:unsignedLong, $uri as xs:string, $line as xs:unsigned) as xs:unsignedLong* external;
declare function dbg:next($request as xs:unsignedLong) as empty-sequence() external;
declare function dbg:out($request as xs:unsignedLong) as empty-sequence() external;
declare function dbg:stack($request as xs:unsignedLong) as element(dbg:stack) external;
declare function dbg:status($request-id as xs:unsignedLong*) as element(dbg:requests)? external;
declare function dbg:step($request as xs:unsignedLong) as empty-sequence() external;
declare function dbg:stop() as empty-sequence() external;
declare function dbg:stopped($server as xs:unsignedLong) as xs:unsignedLong* external;
declare function dbg:stopped() as xs:unsignedLong* external;
declare function dbg:value($request as xs:unsignedLong) as item()* external;
declare function dbg:value($request as xs:unsignedLong, $expr as xs:string) as item()* external;
declare function dbg:wait($request-id as xs:unsignedLong*, $timeout as xs:unsignedLong) as empty-sequence() external;
