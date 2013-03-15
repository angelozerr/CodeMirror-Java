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

module namespace xinc="http://marklogic.com/xinclude";

declare function xinc:link-expand ( $context as node(), $ref as element(xi:include) ) as node()* external;
declare function xinc:link-references ($node as node()) as xs:string* external;
declare function xinc:node-expand ($node as node()) as node() external;
