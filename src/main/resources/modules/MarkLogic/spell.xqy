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

declare function spell:add-word($uri as xs:string, $word as xs:string) as  empty-sequence()  external;
declare function spell:insert($uri as xs:string, $dict as element(spell:dictionary)) as  empty-sequence()  external;
declare function spell:load($path as xs:string, $uri as xs:string) as  empty-sequence()  external;
declare function spell:make-dictionary($words as xs:string*) as element(spell:dictionary) external;
declare function spell:remove-word($uri as xs:string, $word as xs:string) as  empty-sequence()  external;
