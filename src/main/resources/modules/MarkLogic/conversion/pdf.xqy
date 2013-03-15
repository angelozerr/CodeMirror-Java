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

module namespace pdf="http://marklogic.com/cpf/pdf";

declare function pdf:clean($doc as node()?, $toc as element()?) as  node()?  external;
declare function pdf:get-toc($uri as xs:string) as  element()?  external;
declare function pdf:insert-toc-headers($doc as node()?, $toc as element()?) as  node()?  external;
declare function pdf:make-toc($toc as element()?) as  element()?  external; 
