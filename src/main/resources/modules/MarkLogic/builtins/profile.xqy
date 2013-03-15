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

module namespace prof="http://marklogic.com/xdmp/profile";

declare function prof:allowed($request-id as xs:unsignedLong) as xs:boolean external;
declare function prof:disable($request-id as xs:unsignedLong) as empty-sequence() external;
declare function prof:enable($request-id as xs:unsignedLong) as empty-sequence() external;
declare function prof:eval($xquery as xs:string) as item()* external;
declare function prof:eval($xquery as xs:string, $vars as item()*) as item()* external;
declare function prof:eval($xquery as xs:string, $vars as item()*, $options as node()?) as item()* external;
declare function prof:invoke($path as xs:string) as item()* external;
declare function prof:invoke($path as xs:string, $vars as item()*) as item()* external;
declare function prof:invoke($path as xs:string, $vars as item()*, $options as node()?) as item()* external;
declare function prof:report($request-id as xs:unsignedLong) as element(prof:report)? external;
declare function prof:reset($request-id as xs:unsignedLong) as empty-sequence() external;
declare function prof:value($expr as xs:string) as item()* external;
