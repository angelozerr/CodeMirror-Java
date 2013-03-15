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

module namespace cpf="http://marklogic.com/cpf";

declare function cpf:check-transition($docid as xs:string, $transition as element(*, p:transition)?) as  xs:boolean  external;
declare function cpf:document-get-error($doc as xs:string) as  node()?  external;
declare function cpf:document-get-last-updated($doc as xs:string) as  xs:dateTime  external;
declare function cpf:document-get-processing-status($doc as xs:string) as  xs:string  external;
declare function cpf:document-get-state($doc as xs:string) as  xs:anyURI?  external;
declare function cpf:document-set-error($doc as xs:string, $error as node()?) as  empty-sequence()  external;
declare function cpf:document-set-last-updated($doc as xs:string, $last-updated as xs:dateTime) as  empty-sequence()  external;
declare function cpf:document-set-processing-status($doc as xs:string, $processing-status as xs:string) as  empty-sequence()  external;
declare function cpf:document-set-state($doc as xs:string, $state as xs:anyURI) as  empty-sequence()  external;
declare function cpf:failure($docid as xs:string, $transition as element(*, p:transition)?, $exception as node()?, $override-state as xs:anyURI?) as  empty-sequence()  external;
declare function cpf:success($docid as xs:string, $transition as element(*, p:transition)?, $override-state as xs:anyURI?) as  empty-sequence()  external;

