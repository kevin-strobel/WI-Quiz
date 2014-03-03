package studiduell.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.RundeEntity;
import studiduell.model.SpielEntity;

public interface RundeRepository extends JpaRepository<RundeEntity, Integer> {
	// no new methods here
}
