// Generated by CoffeeScript 1.3.3
(function() {
  var ACUERDO, SEVERIDAD, compositeFrames, createSingleRuleFrame, exportName, simpleFrames, _window;

  simpleFrames = [];

  createSingleRuleFrame = function(name, severity, requiredSlots, ruleProcedure, suggestedCorrection) {
    if (suggestedCorrection == null) {
      suggestedCorrection = "No hay sugerencias para este estado de proyecto";
    }
    return simpleFrames.push((new Frame({
      name: name,
      suggestedCorrection: suggestedCorrection,
      severity: severity
    })).addRule(requiredSlots, ruleProcedure));
  };

  SEVERIDAD = {
    GRAVE: 'severidad-grave',
    MEDIA: 'severidad-media'
  };

  ACUERDO = {
    FIXED_PRICE: 'fp',
    CPFF: 'cpff',
    TIME_MAT: 'tm',
    MANPOWER: 'mp'
  };

  createSingleRuleFrame('Presupuesto superado', SEVERIDAD.GRAVE, ['totalBudget', 'executedBudget', 'projectType'], function(proj) {
    var _ref;
    return proj.budgetExceeded() && ((_ref = proj.projectType) === ACUERDO.FIXED_PRICE || _ref === ACUERDO.CPFF);
  }, 'Se debe hablar con el cliente y ver si esta dispuesto a aportar m&aacute;s dinero al proyecto\
    para terminar toda la funcionalidad requerida. Si es asi, se debe continuar, sino\
    se debe redondear y entregar el proyecto con las funcionalidades completas hasta\
    el momento.');

  createSingleRuleFrame('Costos subestimados', SEVERIDAD.GRAVE, ['totalBudget', 'executedBudget', 'commitedFunctionality', 'deliveredFunctionality', 'projectType'], function(proj) {
    var deliveryRatio, spendingRatio, _ref;
    spendingRatio = proj.executedBudget / proj.totalBudget;
    deliveryRatio = proj.deliveredFunctionality / proj.commitedFunctionality;
    return spendingRatio > deliveryRatio && ((_ref = proj.projectType) === ACUERDO.FIXED_PRICE || _ref === ACUERDO.TIME_MAT);
  }, 'Analizar si es viable extender el presupuesto del proyecto y renegociar el mismo de\
    ser necesario ya que con el ritmo actual el proyecto va a necesitar m&aacute;s dinero del\
    planificado.');

  createSingleRuleFrame('Costos subestimados', SEVERIDAD.MEDIA, ['totalBudget', 'executedBudget', 'commitedFunctionality', 'deliveredFunctionality', 'projectType'], function(proj) {
    var deliveryRatio, spendingRatio;
    spendingRatio = proj.executedBudget / proj.totalBudget;
    deliveryRatio = proj.deliveredFunctionality / proj.commitedFunctionality;
    return spendingRatio > deliveryRatio && proj.projectType === ACUERDO.CPFF;
  }, 'Analizar si es viable extender el presupuesto del proyecto y renegociar el mismo de\
    ser necesario ya que con el ritmo actual el proyecto va a necesitar m&aacute;s dinero del\
    planificado.');

  createSingleRuleFrame('Calendario atrasado', SEVERIDAD.GRAVE, ['elapsedTime', 'estimatedTime', 'commitedFunctionality', 'deliveredFunctionality', 'projectType'], function(proj) {
    var calendarRatio, deliveryRatio;
    calendarRatio = proj.elapsedTime / proj.estimatedTime;
    deliveryRatio = proj.deliveredFunctionality / proj.commitedFunctionality;
    return calendarRatio > deliveryRatio && proj.projectType === ACUERDO.CPFF;
  }, 'Si todavia falta bastante tiempo para finalizar el proyecto y si se dispone de m&aacute;s\
    presupuesto, agregar m&aacute;s recursos al proyecto para poder corregir el desv&iacute;o en el tiempo.\
     Si no hay mucho tiempo, otra posibilidad es ver si los recursos actuales \
    pueden trabajar extra en el proyecto (lo cual deviene en m&aacute;s presupuesto). Esto siempre\
    y cuando prime la fecha de entrega (y esta sea rigurosa) sobre el presupuesto. Si esto\
    no es posible hay que analizar la posibilidad de terminar el proyecto.');

  createSingleRuleFrame('Calendario atrasado', SEVERIDAD.MEDIA, ['elapsedTime', 'estimatedTime', 'commitedFunctionality', 'deliveredFunctionality', 'projectType'], function(proj) {
    var calendarRatio, deliveryRatio, _ref;
    calendarRatio = proj.elapsedTime / proj.estimatedTime;
    deliveryRatio = proj.deliveredFunctionality / proj.commitedFunctionality;
    return calendarRatio > deliveryRatio && ((_ref = proj.projectType) === ACUERDO.MANPOWER || _ref === ACUERDO.TIME_MAT);
  }, 'Si todavia falta bastante tiempo para finalizar el proyecto y si se dispone de m&aacute;s\
    presupuesto, agregar m&aacute;s recursos al proyecto para poder corregir el desvio en el tiempo.\
     Si no hay mucho tiempo, otra posibilidad es ver si los recursos actuales \
    pueden trabajar extra en el proyecto ( lo cual deviene en m&aacute;s presupuesto). Esto siempre\
    y cuando prime la fecha de entrega (y esta sea rigurosa) sobre el presupuesto. Si esto\
    no es posible hay que analizar la posibilidad de terminar el proyecto.');

  createSingleRuleFrame('Esfuerzo subestimado', SEVERIDAD.GRAVE, ['investedEffort', 'estimatedEffort', 'commitedFunctionality', 'deliveredFunctionality'], function(proj) {
    var deliveryRatio, effortRatio;
    effortRatio = proj.investedEffort / proj.estimatedEffort;
    deliveryRatio = proj.deliveredFunctionality / proj.commitedFunctionality;
    return effortRatio > deliveryRatio;
  }, 'Una vez que el proyecto ya se encuentra en curso, la incertidumbre es m&aacute;s baja.\
    Si se ha subestimado el proyecto se debe volver a estimar el proyecto y con una\
    estimacion m&aacute;s precisa renegociar el proyecto con el cliente.');

  createSingleRuleFrame('Gestion de cambios deficiente', SEVERIDAD.GRAVE, ['commitedFunctionality', 'deliveredFunctionality', 'projectType'], function(proj) {
    var _ref;
    return proj.deliveredFunctionality > 1.1 * proj.commitedFunctionality && ((_ref = proj.projectType) === ACUERDO.FIXED_PRICE || _ref === ACUERDO.CPFF);
  }, 'El proyecto est&aacute; incluyendo m&aacute;s funcionalidades de las comprometidas en un primer\
    momento. Se debe ser m&aacute;s estricto con el plan de proyecto, a menos que el cliente\
    est&eacute; dispuesto a incrementar el presupuesto y que se posean recursos para\
    estirar el mismo.');

  createSingleRuleFrame('Gestion de cambios deficiente', SEVERIDAD.MEDIA, ['commitedFunctionality', 'deliveredFunctionality', 'projectType'], function(proj) {
    return proj.deliveredFunctionality > 1.1 * proj.commitedFunctionality && proj.projectType === ACUERDO.TIME_MAT;
  }, 'El proyecto esta incluyendo m&aacute;s funcionalidades de las comprometidas en un primer\
    momento. Se debe ser m&aacute;s estricto con el plan de proyecto, a menos que el cliente\
    este dispuesto a incrementar el presupuesto y que se posean recursos para\
    estirar el mismo.');

  createSingleRuleFrame('Calendario excedente', SEVERIDAD.MEDIA, ['elapsedTime', 'estimatedTime', 'commitedFunctionality', 'deliveredFunctionality'], function(proj) {
    var allDelivered, early;
    allDelivered = proj.deliveredFunctionality >= proj.commitedFunctionality;
    early = proj.estimatedTime > 1.1 * proj.elapsedTime;
    return allDelivered && early;
  }, 'En este caso a el proyecto le sobra tiempo. Si bien no es bueno que se haya \
    sobreestimado la duracion del mismo, no es raz&oacute;n para alarmarse.');

  createSingleRuleFrame('Esfuerzo sobreestimado', SEVERIDAD.GRAVE, ['investedEffort', 'estimatedEffort', 'commitedFunctionality', 'deliveredFunctionality', 'projectType'], function(proj) {
    var allDelivered, overestimated;
    allDelivered = proj.deliveredFunctionality >= proj.commitedFunctionality;
    overestimated = proj.estimatedEffort > 1.1 * proj.investedEffort;
    return allDelivered && overestimated && proj.projectType === ACUERDO.MANPOWER;
  }, 'En este caso al proyecto le sobra tiempo y el cliente paga por tiempo, por lo \
    que se podr&iacute;a tener el caso de tener gente osciosa. No hay soluci&oacute;n para esto.');

  createSingleRuleFrame('Esfuerzo sobreestimado', SEVERIDAD.MEDIA, ['investedEffort', 'estimatedEffort', 'commitedFunctionality', 'deliveredFunctionality', 'projectType'], function(proj) {
    var allDelivered, overestimated;
    allDelivered = proj.deliveredFunctionality >= proj.commitedFunctionality;
    overestimated = proj.estimatedEffort > 1.1 * proj.investedEffort;
    return allDelivered && overestimated && proj.projectType === ACUERDO.FIXED_PRICE;
  }, 'En este caso al proyecto le sobra tiempo aunque el proyecto se paga como s&iacute;\
    hubiera transcurrido todo el tiempo. No habr&iacute;a problema en principio.');

  compositeFrames = [];

  compositeFrames.push(new CompositeFrame({
    name: 'Proyecto al horno',
    suggestedCorrection: 'Yo que usted empiezo a correr...',
    requiredFrames: ['Presupuesto superado', 'Gestion de cambios deficiente']
  }));

  _window = this;

  exportName = function(name, value) {
    if (!(_.isString(name) && !_.isEmpty(name))) {
      return;
    }
    if (typeof module !== "undefined" && module !== null) {
      module.exports[name] = value;
    }
    return _window[name] = value;
  };

  exportName('simpleFrames', simpleFrames);

  exportName('compositeFrames', compositeFrames);

}).call(this);
