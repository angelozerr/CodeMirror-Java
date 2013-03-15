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

module namespace cvt="http://marklogic.com/cpf/convert";

declare function cvt:basename($uri as xs:string) as  xs:string  external;
declare function cvt:basepath($uri as xs:string) as  xs:string  external;
declare function cvt:destination-uri($uri as xs:string, $extension as xs:string) as  xs:string  external;
declare function cvt:part-uri($uri as xs:string, $part as xs:string) as  xs:string  external;
declare function cvt:save-converted-documents($source-uri as xs:string, $destination-uri as xs:string, $manifest as element(), $docs as document-node()*) as  empty-sequence()  external;
