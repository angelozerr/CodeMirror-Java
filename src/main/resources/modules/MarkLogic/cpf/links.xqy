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

module namespace lnk="http://marklogic.com/cpf/links";

declare function lnk:create($from as xs:string, $to as xs:string, $role as xs:string, $rev-role as xs:string, $strength as xs:string) as  empty-sequence()  external;
declare function lnk:from($from as xs:string) as  element(lnk:link)*  external;
declare function lnk:get($from as xs:string, $to as xs:string) as  element(lnk:link)?  external;
declare function lnk:insert($link as element(lnk:link)) as  empty-sequence()  external;
declare function lnk:remove($from as xs:string, $to as xs:string) as  element(lnk:link)  external;
declare function lnk:to($to as xs:string) as  element(lnk:link)*  external;
