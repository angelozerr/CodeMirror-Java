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

module namespace xhtml="http://marklogic.com/cpf/xhtml";

declare function xhtml:add-lists($doc as node()?) as  node()?  external;
declare function xhtml:clean($doc as node()?) as  node()?  external;
declare function xhtml:restructure($doc as node()?) as  node()?  external;
