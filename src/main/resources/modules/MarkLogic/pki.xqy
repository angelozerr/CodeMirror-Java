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

module namespace pki="http://marklogic.com/xdmp/pki";

declare function pki:create-template($name as xs:string, $description as xs:string, $key-type as xs:string?, $key-options as element()?, $csr as element(x509:req)) as element(pki:template) external;
declare function pki:delete-certificate($certificate-id as xs:unsignedLong) as empty-sequence() external;
declare function pki:delete-template($template-id as xs:unsignedLong) as empty-sequence() external;
declare function pki:generate-certificate-request($template-id as xs:unsignedLong, $common-name as xs:string, $dns-name as xs:string?, $ip-addr as xs:string?) as xs:string external;
declare function pki:generate-template-certificate-authority($template-id as xs:unsignedLong, $valid-for as xs:unsignedInt) as empty-sequence() external;
declare function pki:generate-temporary-certificate($template-id as xs:unsignedLong, $valid-for as xs:unsignedInt, $common-name as xs:string, $dns-name as xs:string?, $ip-addr as xs:string?) as empty-sequence() external;
declare function pki:generate-temporary-certificate-if-necessary($template-id as xs:unsignedLong, $valid-for as xs:unsignedInt, $common-name as xs:string, $dns-name as xs:string?, $ip-addr as xs:string?) as empty-sequence() external;
declare function pki:get-certificate($template-id as xs:unsignedLong, $common-name as xs:string, $dns-name as xs:string?, $ip-addr as xs:string?) as element(pki:certificate)? external;
declare function pki:get-certificate-pem($template-id as xs:unsignedLong, $hostname as xs:string) as xs:string* external;
declare function pki:get-certificate-xml($template-id as xs:unsignedLong, $hostname as xs:string) as element(x509:cert)* external;
declare function pki:get-certificates($cert-id as xs:unsignedLong*) as element(pki:certificate)* external;
declare function pki:get-certificates-for-template($template-id as xs:unsignedLong) as element(pki:certificate)* external;
declare function pki:get-certificates-for-template-xml($template-id as xs:unsignedLong) as element(x509:cert)* external;
declare function pki:get-pending-certificate-request($template-id as xs:unsignedLong, $common-name as xs:string, $dns-name as xs:string?, $ip-addr as xs:string?) as element(pki:request)? external;
declare function pki:get-pending-certificate-requests-pem($template-id as xs:unsignedLong) as xs:string* external;
declare function pki:get-pending-certificate-requests-xml($template-id as xs:unsignedLong) as element(x509:req)* external;
declare function pki:get-template($template-id as xs:unsignedLong*) as element(pki:template)* external;
declare function pki:get-template-by-name($template-name as xs:string) as element(pki:template)* external;
declare function pki:get-template-certificate-authority($template-id as xs:unsignedLong) as element(pki:certificate)? external;
declare function pki:get-template-ids() as xs:unsignedLong* external;
declare function pki:get-trusted-certificate-ids() as xs:unsignedLong* external;
declare function pki:insert-certificate-revocation-list($url as xs:string, $crl as item()) as empty-sequence() external;
declare function pki:insert-signed-certificates($certs as xs:string) as empty-sequence() external;
declare function pki:insert-template($template as element(pki:template)) as xs:unsignedLong external;
declare function pki:insert-trusted-certificates($certs as xs:string) as xs:unsignedLong* external;
declare function pki:is-temporary($cert as element(pki:certificate)) as xs:boolean external;
declare function pki:need-certificate($template-id as xs:unsignedLong, $common-name as xs:string, $dns-name as xs:string?, $ip-addr as xs:string?) as xs:boolean external;
declare function pki:template-get-description($template as element(pki:template)) as xs:string external;
declare function pki:template-get-id($template as element(pki:template)) as xs:unsignedLong external;
declare function pki:template-get-key-options($template as element(pki:template)) as element(pki:key-options) external;
declare function pki:template-get-key-type($template as element(pki:template)) as xs:string external;
declare function pki:template-get-name($template as element(pki:template)) as xs:string external;
declare function pki:template-get-request($template as element(pki:template)) as element(x509:req) external;
declare function pki:template-get-version($template as element(pki:template)) as xs:unsignedLong external;
declare function pki:template-in-use($template-id as xs:unsignedLong) as xs:boolean external;
declare function pki:template-set-description($template as element(pki:template), $description as xs:string) as element(pki:template) external;
declare function pki:template-set-key-options($template as element(pki:template), $key-options as element(pki:key-options)) as element(pki:template) external;
declare function pki:template-set-key-type($template as element(pki:template), $key-type as xs:string) as element(pki:template) external;
declare function pki:template-set-name($template as element(pki:template), $name as xs:string) as element(pki:template) external;
declare function pki:template-set-request($template as element(pki:template), $req as element(x509:req)) as element(pki:template) external;
