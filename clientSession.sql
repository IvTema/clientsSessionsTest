DELETE s1
FROM sessions s1
JOIN sessions s2
    ON s1.id > s2.id
    AND s1.start_time = s2.start_time 
    AND s1.session_configuration_id = s2.session_configuration_id;

UPDATE session_members sm
JOIN sessions s ON sm.session_id = s.id
SET sm.session_id = (
    SELECT id
    FROM sessions
    WHERE start_time = s.start_time
    AND session_configuration_id = s.session_configuration_id
    ORDER BY id ASC
    LIMIT 1
);

DELETE sm1
FROM session_members sm1
JOIN session_members sm2
    ON sm1.id > sm2.id 
    AND sm1.session_id = sm2.session_id 
    AND sm1.client_id = sm2.client_id;