//begin: dynamic HTML module

// <!--

var dynamicHTMLManager = {

domRefs:[],

tempdomRefs:[],

pageComponents:[],

temppageComponents:[],

createPageComponents:function(isTemp)
{
	if(!isTemp)
	{
		if(this.pageComponents.length>0)
		{
			var curElement, curAttribute;
			for(var i=0; i<this.pageComponents.length; i++)
			{
				curElement = document.createElement(this.pageComponents[i].tag);
				//id is required
				curElement.setAttribute("id", this.pageComponents[i].id);
				//create other attributes
				if(this.pageComponents[i].attributes!="none" && this.pageComponents[i].attributes!="")
				{
					for(var j=0; j<this.pageComponents[i].attributes.length; j++)
					{
						for (attr in this.pageComponents[i].attributes[j])
						{
							if(attr.toLowerCase() == "class")
								curElement.className = this.pageComponents[i].attributes[j][attr];
							else
								curElement.setAttribute(attr,this.pageComponents[i].attributes[j][attr]);
						}
					}
				}
				this.domRefs.push(curElement);
			}
		}
	}
	else
	{
		if(this.temppageComponents.length>0)
		{
			var curElement, curAttribute;
			for(var i=0; i<this.temppageComponents.length; i++)
			{
				curElement = document.createElement(this.temppageComponents[i].tag);
				//id is required
				curElement.setAttribute("id", this.temppageComponents[i].id);
				//create other attributes
				if(this.temppageComponents[i].attributes!="none" && this.temppageComponents[i].attributes!="")
				{
					for(var j=0; j<this.temppageComponents[i].attributes.length; j++)
					{
						for (attr in this.temppageComponents[i].attributes[j])
						{
							if(attr.toLowerCase() == "class")
								curElement.className = this.temppageComponents[i].attributes[j][attr];
							else
								curElement.setAttribute(attr,this.temppageComponents[i].attributes[j][attr]);
						}
					}
				}
				this.tempdomRefs.push(curElement);
			}
		}

	}
},

organizePageComponents:function(isTemp)
{
	if(!isTemp)
	{
		if(this.pageComponents.length>0)
		{
			var curElement;
			for(var i=0; i<this.pageComponents.length; i++)
			{
				curElement = this.getDomObj(this.pageComponents[i].id);
				//append child nodes
				if(this.pageComponents[i].childComponents!="none" && this.pageComponents[i].childComponents!="")
				{
					var curChild;
					for(var j=0; j<this.pageComponents[i].childComponents.length; j++)
					{
						curChild = this.pageComponents[i].childComponents[j];
						if(typeof curChild == "string")
						{
							//curElement.innerHTML += curChild;
							curChild = document.createTextNode(curChild);
							curElement.appendChild(curChild);
						}
						else
						{
							//curChild = objfunc(curChild.childID);
							curChild = this.getDomObj(curChild.childID);
							curElement.appendChild(curChild);
						}
					}
				}
			}
		}
	}
	else
	{
		if(this.temppageComponents.length>0)
		{
			var curElement;
			for(var i=0; i<this.temppageComponents.length; i++)
			{
				curElement = this.getTempDomObj(this.temppageComponents[i].id);
				//append child nodes
				if(this.temppageComponents[i].childComponents!="none" && this.temppageComponents[i].childComponents!="")
				{
					var curChild;
					for(var j=0; j<this.temppageComponents[i].childComponents.length; j++)
					{
						curChild = this.temppageComponents[i].childComponents[j];
						if(typeof curChild == "string")
						{
							//curElement.innerHTML += curChild;
							curChild = document.createTextNode(curChild)
							curElement.appendChild(curChild);
						}
						else
						{
							//curChild = objfunc(curChild.childID);
							//alert("test: should not see this: "+this.temppageComponents[i].id+" "+this.temppageComponents[i].childComponents);
							curChild = this.getTempDomObj(curChild.childID);
							curElement.appendChild(curChild);
						}
					}
				}
			}
		}
	}
},

//temporary dom objects:
//saveTempComponent, processtempComponents, getTempDomObj, and clearTempComponents

saveComponent:function(tag, id, attributes, childComponents)
{
	this.pageComponents.push({"tag":tag,"id":id,"attributes":attributes,"childComponents":childComponents});
},

saveTempComponent:function(tag, id, attributes, childComponents)
{
	this.temppageComponents.push({"tag":tag,"id":id,"attributes":attributes,"childComponents":childComponents});
},

processComponents:function()
{
	if(this.pageComponents.length>0)
	{
		this.createPageComponents(false);
		this.organizePageComponents(false);
	}
},

processTempComponents:function()
{
	if(this.temppageComponents.length>0)
	{
		this.createPageComponents(true);
		this.organizePageComponents(true);
	}
},

getDomObj:function(id)
{
	if(this.pageComponents.length>0 && this.domRefs.length>0)
	{
		for(i=0; i<this.domRefs.length; i++)
		{
			if(this.domRefs[i].attributes.getNamedItem("id").value == id)
				return this.domRefs[i];
		}
	}	
	return null;
},

getTempDomObj:function(id)
{
	if(this.temppageComponents.length>0 && this.tempdomRefs.length>0)
	{
		for(i=0; i<this.tempdomRefs.length; i++)
		{
			if(this.tempdomRefs[i].attributes.getNamedItem("id").value == id)
				return this.tempdomRefs[i];
		}
	}	
	return null;
},

clearTempComponents:function()
{
	this.tempdomRefs.length = 0;
	this.temppageComponents.length = 0;
},

addComponent:function(eleID, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)//make sure the parent exists
	{
		if(beforeSibling == null)
			document.getElementById(parentID).appendChild(this.getDomObj(eleID));
		else
		{
			if(document.getElementById(beforeSibling)!=null)//make sure the sibling exists
				document.getElementById(parentID).insertBefore(this.getDomObj(eleID), document.getElementById(beforeSibling));
			else
				document.getElementById(parentID).appendChild(this.getDomObj(eleID));
		}
	}
},

addTempComponent:function(eleID, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)//make sure the parent exists
	{
		if(beforeSibling == null)
			document.getElementById(parentID).appendChild(this.getTempDomObj(eleID));
		else
		{
			if(document.getElementById(beforeSibling)!=null)//make sure the sibling exists
				document.getElementById(parentID).insertBefore(this.getTempDomObj(eleID), document.getElementById(beforeSibling));
			else
				document.getElementById(parentID).appendChild(this.getTempDomObj(eleID));
		}
	}
},

replaceComponent:function(oldEleID, newEleID, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)
	{
		if(document.getElementById(oldEleID)!=null)
			document.getElementById(parentID).replaceChild(this.getDomObj(newEleID), document.getElementById(oldEleID));
		else
			this.addComponent(newEleID, parentID, beforeSibling);
	}
},

replaceTempComponent:function(oldEleID, newEleID, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)
	{
		if(document.getElementById(oldEleID)!=null)
			document.getElementById(parentID).replaceChild(this.getTempDomObj(newEleID), document.getElementById(oldEleID));
		else
			this.addTempComponent(newEleID, parentID, beforeSibling);
	}
},

removeComponent:function(eleID, parentID)
{
	if(document.getElementById(parentID)!=null && document.getElementById(eleID)!=null)
	{
		document.getElementById(parentID).removeChild(document.getElementById(eleID));
	}
},

addText:function(text, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)
	{
		if(document.getElementById(parentID).nodeName.toLowerCase() == "title")
			document.title += msg;

		if(beforeSibling == null)
			document.getElementById(parentID).appendChild(document.createTextNode(text));
		else
			document.getElementById(parentID).insertBefore(document.createTextNode(text), document.getElementById(beforeSibling));	
	}
},

setText:function(text, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)
	{
		if(document.getElementById(parentID).nodeName.toLowerCase() == "title")
			document.title = msg;

		if(beforeSibling == null)
		{
			try
			{
				document.getElementById(parentID).innerHTML = text;
			}
			catch(e){}
		}
		else
			document.getElementById(parentID).insertBefore(document.createTextNode(text), document.getElementById(beforeSibling));	
	}
},

setFormElementText:function(text, eleID)
{
	if(document.getElementById(eleID)!=null)
	{
		try
		{
			document.getElementById(eleID).value = text;	
		}
		catch(e){}
	}
},

setHTML:function(msg, parentID)
{
	if(document.getElementById(parentID)!=null)
	{
		if(document.getElementById(parentID).nodeName.toLowerCase() == "title")
			document.title = msg;
		else
		{
			try
			{
				document.getElementById(parentID).innerHTML = msg;
			}
			catch(e){}
		}
	}
},

appendHTML:function(msg, parentID)
{
	if(document.getElementById(parentID)!=null)
	{
		if(document.getElementById(parentID).nodeName.toLowerCase() == "title")
			document.title += msg;
		else
		{
			try
			{
				document.getElementById(parentID).innerHTML += msg;
			}
			catch(e){}
		}
	}
},

setAttribute:function(eleID, name, value)
{
	if(document.getElementById(eleID)!=null)
	{
		if(name.toLowerCase() == "class")
			document.getElementById(eleID).className = value;
		else	
			document.getElementById(eleID).setAttribute(name, value);
	}
},

addSingleComponent:function(tag, id, attributes, text, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)
	{
		this.clearTempComponents();
		this.temppageComponents.push({"tag":tag,"id":id,"attributes":attributes,"childComponents":text});
		this.processTempComponents();

		this.addTempComponent(id, parentID, beforeSibling);

		this.clearTempComponents();
	}
},

replaceSingleComponent:function(oldEleId, tag, newEleId, attributes, text, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)
	{
		this.clearTempComponents();
		this.temppageComponents.push({"tag":tag,"id":newEleId,"attributes":attributes,"childComponents":text});
		this.processTempComponents();

		this.replaceTempComponent(oldEleId, newEleId, parentID, beforeSibling);

		this.clearTempComponents();
	}
},

addMultiComponents:function(tag, id, attributes, htmlContent, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)
	{
		this.clearTempComponents();
		this.temppageComponents.push({"tag":tag,"id":id,"attributes":attributes,"childComponents":""});
		this.processTempComponents();

		this.getTempDomObj(id).innerHTML = htmlContent;

		this.addTempComponent(id, parentID, beforeSibling);

		this.clearTempComponents();
	}
},

replaceMultiComponents:function(oldEleId, tag, newEleId, attributes, htmlContent, parentID, beforeSibling)
{
	if(document.getElementById(parentID)!=null)
	{
		this.clearTempComponents();
		this.temppageComponents.push({"tag":tag,"id":newEleId,"attributes":attributes,"childComponents":""});
		this.processTempComponents();

		this.getTempDomObj(newEleId).innerHTML = htmlContent;

		this.replaceTempComponent(oldEleId, newEleId, parentID, beforeSibling);

		this.clearTempComponents();
	}
}

};