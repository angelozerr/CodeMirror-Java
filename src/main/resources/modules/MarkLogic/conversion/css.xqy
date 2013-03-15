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

module namespace css="http://marklogic.com/cpf/css";

declare function css:convert($css as xs:string, $options as xs:string) as  element(css:styles)?  external;
declare function css:get($doc as xs:string) as  xs:string  external;
